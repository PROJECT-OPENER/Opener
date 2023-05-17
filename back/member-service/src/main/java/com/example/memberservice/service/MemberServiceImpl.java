package com.example.memberservice.service;

import static com.example.memberservice.entity.redis.RedisKey.*;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.memberservice.common.config.security.JwtTokenProvider;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.common.util.AwsS3Uploader;
import com.example.memberservice.common.util.MailUtil;
import com.example.memberservice.dto.BadgeDto;
import com.example.memberservice.dto.InterestDto;
import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.MemberInterestsRequestDto;
import com.example.memberservice.dto.request.member.NicknameRequestDto;
import com.example.memberservice.dto.request.member.PasswordRequestDto;
import com.example.memberservice.dto.request.member.ProfileImgRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.BadgeResponseDto;
import com.example.memberservice.dto.response.member.ChallengeResponseDto;
import com.example.memberservice.dto.response.member.LoginMemberResponseDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;
import com.example.memberservice.dto.response.member.RankResponseDto;
import com.example.memberservice.entity.member.Badge;
import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.MemberInterest;
import com.example.memberservice.entity.member.Roadmap;
import com.example.memberservice.entity.shadowing.Interest;
import com.example.memberservice.repository.BadgeRepository;
import com.example.memberservice.repository.InterestRepository;
import com.example.memberservice.repository.LoveRepository;
import com.example.memberservice.repository.MemberChallengeRepository;
import com.example.memberservice.repository.MemberInterestRepository;
import com.example.memberservice.repository.MemberRepository;
import com.example.memberservice.repository.RoadmapRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final RoadmapRepository roadmapRepository;
	private final InterestRepository interestRepository;
	private final MemberInterestRepository memberInterestRepository;
	private final MemberRepository memberRepository;
	private final BadgeRepository badgeRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final LoveRepository loveRepository;
	private final RedisService redisService;
	private final JavaMailSender javaMailSender;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final AwsS3Uploader awsS3Uploader;

	@Value("${spring.img.baseurl}")
	private String baseImgUrl;

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
		Member member = signUpMemberRequestDto.toEntity(encryptedPwd);
		redisService.deleteData(AUTH_EMAIL.getKey() + email);
		memberRepository.save(member);

		Badge badge = Badge.builder()
			.member(member)
			.attendanceCount(0)
			.challengeCount(0)
			.shadowingCount(0)
			.gameCount(0)
			.build();

		badgeRepository.save(badge);

		Roadmap roadmap = Roadmap.builder()
			.member(member)
			.stepNo(1)
			.stepTheme(1)
			.sentenceNo(1)
			.build();

		roadmapRepository.save(roadmap);
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

		Badge badge = badgeRepository.findByMember_MemberId(member.getMemberId()).orElseGet(() -> {
			Badge newBadge = Badge.builder()
				.member(member)
				.attendanceCount(0)
				.shadowingCount(0)
				.challengeCount(0)
				.gameCount(0)
				.build();
			return badgeRepository.save(newBadge);
		});

		String password = loginRequestDto.getPassword();
		if (!bCryptPasswordEncoder.matches(password, member.getPassword())) {
			throw new ApiException(ExceptionEnum.WRONG_PASSWORD_EXCEPTION);
		}

		int memberInterests = memberInterestRepository.countDistinctInterestIdsByMember(member);
		boolean hasInterest = memberInterests >= 2 ? true : false;

		LocalDate loginDate = member.getLoginDate();
		if (loginDate == null || LocalDate.now().isAfter(loginDate)) {
			member.updateLoginDate(LocalDate.now());
			badge.updateAttendanceCount();
		}

		String accessToken = jwtTokenProvider.createToken(email);
		redisService.setMemberWithDuration(accessToken, member.getMemberId(), JwtTokenProvider.ACCESS_TOKEN_VALID_TIME);
		return LoginResponseDto.builder()
			.accessToken(accessToken)
			.hasInterest(hasInterest)
			.loginMemberResponseDto(getMyInfo(member))
			.build();
	}

	/**
	 * 김윤미
	 * explain : 사용자 초기 관심사 등록
	 * @param memberInterestsRequestDto : 등록하고자 하는 관심사 ID 배열 정보
	 * @param memberId : 현재 사용자 아이디
	 */
	@Override
	@Transactional
	public void createInterests(MemberInterestsRequestDto memberInterestsRequestDto, Long memberId) {
		Set<Long> interests = memberInterestsRequestDto.getInterests();

		if (interests.size() < 2) {
			throw new ApiException(ExceptionEnum.INSUFFICIENT_INTERESTS_EXCEPTION);
		}
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		interests.forEach((interestId) -> {
			Interest interest = interestRepository.findById(interestId)
				.orElseThrow(() -> new ApiException(ExceptionEnum.INTEREST_NOT_FOUND));
			MemberInterest memberInterest = MemberInterest.builder().member(member).interest(interest).build();
			memberInterestRepository.save(memberInterest);
		});
	}

	/**
	 * 김윤미
	 * explain : 로그아웃 - Redis에서 사용자 정보 삭제
	 * @param token : 사용자 토큰
	 */
	@Override
	@Transactional
	public void logout(String token) {
		redisService.deleteData(token);
	}

	/**
	 * 김윤미
	 * explain : 사용자 닉네임 변경
	 * @param memberId : 사용자 아이디
	 * @param nicknameRequestDto : 변경 닉네임 정보
	 */
	@Override
	@Transactional
	public void updateNickname(Long memberId, NicknameRequestDto nicknameRequestDto) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		String nickname = nicknameRequestDto.getNickname();
		checkNickname(nickname);

		member.updateNickname(nickname);
	}

	/**
	 * 김윤미
	 * explain : 사용자 비밀번호 변경
	 * @param memberId : 사용자 아이디
	 * @param passwordRequestDto : 변경 비밀번호 정보
	 */
	@Override
	@Transactional
	public void updatePassword(Long memberId, PasswordRequestDto passwordRequestDto) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		String encryptedPwd = bCryptPasswordEncoder.encode(passwordRequestDto.getPassword());

		member.updatePassword(encryptedPwd);
	}

	/***
	 * 김윤미
	 * explain : 사용자 관심사 변경
	 * @param memberId : 사용자 아이디
	 * @param memberInterestsRequestDto : 변경 관심사 정보
	 */
	@Override
	@Transactional
	public void updateMemberInterests(Long memberId, MemberInterestsRequestDto memberInterestsRequestDto) {
		Set<Long> interests = memberInterestsRequestDto.getInterests();

		if (interests.size() < 2) {
			throw new ApiException(ExceptionEnum.INSUFFICIENT_INTERESTS_EXCEPTION);
		}

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		memberInterestRepository.deleteAllInBatch(memberInterestRepository.findAllByMember(member));

		interests.forEach((interestId) -> {
			memberInterestRepository.save(MemberInterest.builder()
				.member(member)
				.interest(interestRepository.findById(interestId)
					.orElseThrow(() -> new ApiException(ExceptionEnum.INTEREST_NOT_FOUND)))
				.build());
		});
	}

	/**
	 * 김윤미
	 * explain : 사용자 프로필 사진 변경
	 * @param memberId : 사용자 아이디
	 * @param profileImgRequestDto : 프로필 사진 데이터 정보
	 */
	@Override
	@Transactional
	public void updateProfileImg(Long memberId, ProfileImgRequestDto profileImgRequestDto) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

		MultipartFile profileImg = profileImgRequestDto.getProfileImg();
		String profileImgUrl = profileImg == null ? null : awsS3Uploader.uploadImage(profileImg);
		member.updateProfile(profileImgUrl);
	}

	/**
	 * 김윤미
	 * explain : 내 정보 조회
	 * @param memberId : 로그인한 사용자 아이디
	 * @return : 사용자 정보
	 */
	@Override
	@Transactional
	public LoginMemberResponseDto getMyInfo(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));
		return getMyInfo(member);
	}

	/**
	 * 김윤미
	 * explain : Entity로 이메일, 닉네임, 프로필, 관심사 정보 조회
	 * @param member : 사용자 정보 Entity
	 * @return : 사용자 정보
	 */
	@Transactional
	public LoginMemberResponseDto getMyInfo(Member member) {
		List<InterestDto> interests = memberInterestRepository.findAllByMember(member)
			.stream()
			.map(MemberInterest::getInterest).collect(Collectors.toSet())
			.stream()
			.map(InterestDto::new)
			.sorted(Comparator.comparing(InterestDto::getInterestId))
			.collect(Collectors.toList());

		return LoginMemberResponseDto.builder()
			.email(member.getEmail())
			.nickname(member.getNickname())
			.profile(member.getProfile() == null ? baseImgUrl : member.getProfile())
			.score(member.getScore())
			.rank(memberRepository.countMembersWithScoreGreaterThan(member.getScore()) + 1)
			.interests(interests)
			.build();
	}

	/**
	 * 김윤미
	 * explain : 내 뱃지 현황 조회
	 * @param memberId : 사용자 아이디
	 * @return
	 */
	@Override
	@Transactional
	public BadgeResponseDto getBadge(Long memberId) {
		memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));
		Badge badge = badgeRepository.findByMember_MemberId(memberId).orElse(Badge.builder()
			.attendanceCount(0)
			.shadowingCount(0)
			.challengeCount(0)
			.gameCount(0)
			.build());

		BadgeResponseDto badgeResponseDto = BadgeResponseDto.builder()
			.attendanceBadge(new BadgeDto(badge.getAttendanceCount()))
			.shadowingBadge(new BadgeDto(badge.getShadowingCount()))
			.challengeBadge(new BadgeDto(badge.getChallengeCount()))
			.gameBadge(new BadgeDto(badge.getGameCount()))
			.build();

		return badgeResponseDto;
	}

	/**
	 * 김윤미
	 * explain : 내 챌린지 정보 조회
	 * @param memberId : 사용자 ID
	 * @param pageable : 페이징 정보
	 * @return : 챌린지 정보 + 챌린지 좋아요 개수 정보
	 */
	@Override
	@Transactional
	public List<ChallengeResponseDto> getMyChallenges(Long memberId, Pageable pageable) {
		memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));
		return memberChallengeRepository.findByMember_MemberIdAndIsDeleteOrderByCreateDateDesc(memberId, false, pageable)
			.getContent()
			.stream()
			.map(ChallengeResponseDto::new)
			.peek(dto -> dto.setLikeCount(
				loveRepository.countByMemberChallenge_MemberChallengeIdAndIsLove(dto.getMemberChallengeId(), true)))
			.collect(Collectors.toList());
	}

	/**
	 * 김윤미
	 * explain : 내가 좋아요 한 챌린지 목록 조회
	 * @param memberId : 사용자 ID
	 * @param pageable : 페이징 정보
	 * @return : 챌린지 정보 + 챌린지 좋아요 개수 정보
	 */
	@Override
	@Transactional
	public List<ChallengeResponseDto> getMyLoveChallenges(Long memberId, Pageable pageable) {
		memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));
		return memberChallengeRepository.findByLovedMemberIdOrderByCreateDateDesc(memberId, pageable)
			.getContent()
			.stream()
			.map(ChallengeResponseDto::new)
			.peek(dto -> dto.setLikeCount(
				loveRepository.countByMemberChallenge_MemberChallengeIdAndIsLove(dto.getMemberChallengeId(), true)))
			.collect(Collectors.toList());
	}

	/**
	 * 김윤미
	 * explain : 상위 10위권 사용자 순위 목록 조회
	 * @return
	 */
	@Override
	@Transactional
	public List<RankResponseDto> getRank() {
		return memberRepository.getRankingList();
	}
}
