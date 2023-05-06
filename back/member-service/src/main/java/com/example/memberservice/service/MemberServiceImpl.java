package com.example.memberservice.service;

import static com.example.memberservice.entity.redis.RedisKey.*;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.memberservice.client.ShadowingServiceClient;
import com.example.memberservice.common.config.security.JwtTokenProvider;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.common.util.MailUtil;
import com.example.memberservice.dto.MemberDto;
import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.MemberInterestsRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.LoginMemberResponseDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;
import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.MemberInterest;
import com.example.memberservice.entity.shadowing.Interest;
import com.example.memberservice.messagequeue.KafkaProducer;
import com.example.memberservice.repository.MemberInterestRepository;
import com.example.memberservice.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberInterestRepository memberInterestRepository;
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final JavaMailSender javaMailSender;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final ShadowingServiceClient shadowingServiceClient;
	private final KafkaProducer kafkaProducer;

	/**
	 * 김윤미
	 * explain : 이메일 중복 검사
	 * @param email : 이메일
	 */
	@Override
	@Transactional
	public void checkEmail(String email) {
		if (memberRepository.existsByEmail(email)) {
			throw new ApiException(ExceptionEnum.EMAIL_EXIST_EXCEPTION);
		}
	}

	/**
	 * 김윤미
	 * explain : 닉네임 중복 검사
	 * @param nickname : 닉네임
	 */
	@Override
	@Transactional
	public void checkNickname(String nickname) {
		if (memberRepository.existsByNickname(nickname)) {
			throw new ApiException(ExceptionEnum.NICKNAME_EXIST_EXCEPTION);
		}
	}

	/**
	 * 김윤미
	 * explain : 이메일 인증 코드 전송
	 * @param email : 이메일
	 */
	@Override
	@Transactional
	public void sendEmailCode(String email) {
		checkEmail(email);

		String authNumber = MailUtil.makeRandomNumber(6);
		redisService.setDataWithExpiration(SEND_CODE.getKey() + email, authNumber, 60 * 5L);
		redisService.setDataWithStatus(AUTH_EMAIL.getKey() + email, false);

		try {
			javaMailSender.send(MailUtil.setMailForAuth(email, authNumber));
		} catch (MailException e) {
			throw new ApiException(ExceptionEnum.SEND_EMAIL_FAIL_EXCEPTION);
		}
	}

	/**
	 * 김윤미
	 * explain : 이메일 인증 코드 검증
	 * @param checkEmailCodeRequestDto : 이메일, 인증 코드 정보
	 */
	@Override
	@Transactional
	public void checkEmailCode(CheckEmailCodeRequestDto checkEmailCodeRequestDto) {
		String email = checkEmailCodeRequestDto.getEmail();
		checkEmail(email);

		try {
			redisService.getData(AUTH_EMAIL.getKey() + email);
		} catch (NullPointerException e) {
			throw new NullPointerException();
		}

		try {
			String emailCode = (String)(redisService.getData(SEND_CODE.getKey() + email));
			String authCode = checkEmailCodeRequestDto.getAuthCode();
			if (!emailCode.equals(authCode)) {
				throw new ApiException(ExceptionEnum.WRONG_EMAIL_CODE_EXCEPTION);
			}

			redisService.deleteData(SEND_CODE.getKey() + email);
			redisService.setDataWithStatus(AUTH_EMAIL.getKey() + email, true);
		} catch (NullPointerException e) {
			throw new ApiException(ExceptionEnum.INVALID_EMAIL_CODE_EXCEPTION);
		}
	}

	/**
	 * 김윤미
	 * explain : 회원가입
	 * @param signUpMemberRequestDto : 사용자 정보
	 */
	@Transactional
	@Override
	public void signUpMember(SignUpMemberRequestDto signUpMemberRequestDto) {
		String email = signUpMemberRequestDto.getEmail();
		checkEmail(email);

		String nickname = signUpMemberRequestDto.getNickname();
		checkNickname(nickname);

		String encryptedPwd = bCryptPasswordEncoder.encode(signUpMemberRequestDto.getPassword());

		boolean isNotAuthenticated = redisService.existsByKey(AUTH_EMAIL.getKey() + email);
		if (isNotAuthenticated) {
			boolean isCheckedEmail = (Boolean)redisService.getData(AUTH_EMAIL.getKey() + email);
			if (!isCheckedEmail) {
				throw new ApiException(ExceptionEnum.NOT_AUTHENTICATED_EMAIL_EXCEPTION);
			}
		}

		redisService.deleteData(AUTH_EMAIL.getKey() + email);
		kafkaProducer.sendSignUpMember(signUpMemberRequestDto);
		memberRepository.save(signUpMemberRequestDto.toEntity(encryptedPwd));
	}

	/**
	 * 김윤미
	 * explain : 로그인
	 * @param loginRequestDto : 이메일, 비밀번호 정보
	 * @return : 로그인 정보
	 */
	@Override
	@Transactional
	public LoginResponseDto login(LoginRequestDto loginRequestDto) {
		String email = loginRequestDto.getEmail();
		boolean isNotAuthenticated = redisService.existsByKey(AUTH_EMAIL.getKey() + email);

		if (isNotAuthenticated) {
			throw new ApiException(ExceptionEnum.NOT_AUTHENTICATED_EMAIL_EXCEPTION);
		}

		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		String password = loginRequestDto.getPassword();
		if (!bCryptPasswordEncoder.matches(password, member.getPassword())) {
			throw new ApiException(ExceptionEnum.WRONG_PASSWORD_EXCEPTION);
		}

		int memberInterests = memberInterestRepository.countDistinctInterestIdsByMember(member);
		boolean hasInterest = memberInterests >= 2 ? true : false;

		Set<String> interests = memberInterestRepository.findAllByMember(member)
			.stream()
			.map(memberInterest -> shadowingServiceClient.getInterest(memberInterest.getInterest().getInterestId())
				.orElseThrow(() -> new ApiException(ExceptionEnum.INTEREST_NOT_FOUND))
				.getData()
				.getInterest())
			.collect(
				Collectors.toSet());

		LoginMemberResponseDto loginMemberResponseDto = LoginMemberResponseDto.builder()
			.email(member.getEmail())
			.nickname(member.getNickname())
			.profile(member.getProfile())
			.interests(interests)
			.build();

		String accessToken = jwtTokenProvider.createToken(email);
		redisService.setMemberWithDuration(accessToken, member, JwtTokenProvider.ACCESS_TOKEN_VALID_TIME);
		return LoginResponseDto.builder()
			.accessToken(accessToken)
			.hasInterest(hasInterest)
			.loginMemberResponseDto(loginMemberResponseDto)
			.build();
	}

	/**
	 * 김윤미
	 * explain : 사용자 초기 관심사 등록
	 * @param memberInterestsRequestDto : 등록하고자 하는 관심사 ID 배열 정보
	 * @param memberDto : 현재 사용자 정보
	 */
	@Override
	public void createInterests(MemberInterestsRequestDto memberInterestsRequestDto, MemberDto memberDto) {
		Set<Long> interests = memberInterestsRequestDto.getInterests();

		if (interests.size() < 2) {
			throw new ApiException(ExceptionEnum.INSUFFICIENT_INTERESTS_EXCEPTION);
		}
		Member member = memberDto.toEntity(memberDto);

		interests.forEach((interestId) -> {
			Interest interest = shadowingServiceClient.getInterest(interestId)
				.orElseThrow(() -> new ApiException(ExceptionEnum.INTEREST_NOT_FOUND))
				.getData()
				.toEntity();
			MemberInterest memberInterest = MemberInterest.builder().member(member).interest(interest).build();
			memberInterestRepository.save(memberInterest);
		});
	}
}
