package com.example.memberservice.service;

import static com.example.memberservice.entity.redis.RedisKey.*;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.memberservice.common.config.security.JwtTokenProvider;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.common.util.MailUtil;
import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;
import com.example.memberservice.entity.member.Member;
import com.example.memberservice.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final JavaMailSender javaMailSender;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	@Transactional
	public void checkEmail(String email) {
		if (memberRepository.existsByEmail(email)) {
			throw new ApiException(ExceptionEnum.EMAIL_EXIST_EXCEPTION);
		}
	}

	@Override
	@Transactional
	public void checkNickname(String nickname) {
		if (memberRepository.existsByNickname(nickname)) {
			throw new ApiException(ExceptionEnum.NICKNAME_EXIST_EXCEPTION);
		}
	}

	@Override
	@Transactional
	public void sendEmailCode(String email) {
		checkEmail(email);

		String authNumber = MailUtil.makeRandomNumber(10);
		redisService.setDataWithExpiration(SEND_CODE.getKey() + email, authNumber, 60 * 5L);
		redisService.setDataWithStatus(AUTH_EMAIL.getKey() + email, false);

		try {
			javaMailSender.send(MailUtil.setMailForAuth(email, authNumber));
		} catch (MailException e) {
			throw new ApiException(ExceptionEnum.SEND_EMAIL_FAIL_EXCEPTION);
		}
	}

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
			String emailCode = redisService.getData(SEND_CODE.getKey() + email);
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

	@Transactional
	@Override
	public void signUpMember(SignUpMemberRequestDto signUpMemberRequestDto) {
		String email = signUpMemberRequestDto.getEmail();
		checkEmail(email);

		String nickname = signUpMemberRequestDto.getNickname();
		checkNickname(nickname);

		String encryptedPwd = bCryptPasswordEncoder.encode(signUpMemberRequestDto.getPassword());

		redisService.deleteData(AUTH_EMAIL.getKey() + email);

		memberRepository.save(signUpMemberRequestDto.toEntity(encryptedPwd));
	}

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

		String accessToken = jwtTokenProvider.createToken(email);
		return LoginResponseDto.builder()
			.accessToken(accessToken)
			.nickname(member.getNickname())
			.build();

	}
}
