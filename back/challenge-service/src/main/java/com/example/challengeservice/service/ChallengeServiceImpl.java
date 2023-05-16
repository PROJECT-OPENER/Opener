package com.example.challengeservice.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.example.challengeservice.common.exception.ApiException;
import com.example.challengeservice.common.exception.ExceptionEnum;
import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.dto.request.OriginalChallengeRequestDto;
import com.example.challengeservice.dto.response.*;
import com.example.challengeservice.entity.challenge.Love;
import com.example.challengeservice.entity.challenge.MemberChallenge;
import com.example.challengeservice.entity.member.Member;
import com.example.challengeservice.messageQueue.KafkaProducer;
import com.example.challengeservice.messageQueue.dto.produce.DeleteMemberChallengeDto;
import com.example.challengeservice.repository.LoveRepository;
import com.example.challengeservice.repository.MemberRepository;
import com.google.firebase.auth.FirebaseAuthException;

import org.springframework.stereotype.Service;

import com.example.challengeservice.entity.challenge.Challenge;
import com.example.challengeservice.repository.ChallengeRepository;
import com.example.challengeservice.repository.MemberChallengeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
	private final ChallengeRepository challengeRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final LoveRepository loveRepository;
	private final MemberRepository memberRepository;
	private final FireBaseService fireBaseService;
	private final KafkaProducer kafkaProducer;

	/**
	 * 신대득
	 * explain : 원본 챌린지 생성 (관리자용 API)
	 * @param originalChallengeRequestDto
	 */
	@Override
	public void createOriginalChallenge(OriginalChallengeRequestDto originalChallengeRequestDto) {
		Challenge challenge = Challenge.from(originalChallengeRequestDto);
		challengeRepository.save(challenge);
	}

	/**
	 * 신대득
	 * explain : 원본 챌린지들 목록 조회
	 */
	@Override
	public List<OriginalChallengeResponseDto> getOriginalChallenges() {
		List<Challenge> challengeList = challengeRepository.findAll();
		if (challengeList.isEmpty()) {
			throw new ApiException(ExceptionEnum.CHALLENGES_NOT_FOUND_EXCEPTION);
		}
		List<OriginalChallengeResponseDto> originChallengeResponseDtoList = new LinkedList<>();
		for (Challenge challenge : challengeList) {
			int joinCount = memberChallengeRepository.countByChallengeAndIsDelete(challenge, false);
			originChallengeResponseDtoList.add(OriginalChallengeResponseDto.from(challenge, joinCount));
		}
		return originChallengeResponseDtoList;
	}

	/**
	 * 신대득
	 * explain : 원본 영상 정보 조회
	 */
	public OriginalChallengeResponseDto getOriginalChallengeInfo(Long challengeId) {
		Challenge challenge = challengeRepository.findByChallengeId(challengeId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));

		int joinCount = memberChallengeRepository.countByChallengeAndIsDelete(challenge, false);
		return OriginalChallengeResponseDto.from(challenge, joinCount);
	}

	/**
	 * 신대득
	 * explain : 원본 챌린지 선택 조회
	 *
	 * @param challengeId : 원본 챌린지의 Id
	 */
	@Override
	public SelectOriginalResponseDto selectOriginalChallenge(Long challengeId, Integer startIndex, Integer endIndex) {
		OriginalChallengeResponseDto originalChallengeResponseDto = getOriginalChallengeInfo(challengeId);
		List<MemberChallengeResponseDto> memberChallengeResponseDtoList = new ArrayList<>();
		List<MemberChallenge> memberChallenges = memberChallengeRepository.findAllByChallengeIdAndIsDelete(challengeId,
			false);
		for (MemberChallenge memberChallenge : memberChallenges) {
			int likeCount = loveRepository.countByMemberChallengeAndIsLove(memberChallenge, true);
			MemberChallengeResponseDto memberChallengeResponseDto = MemberChallengeResponseDto.from(memberChallenge,
				likeCount);
			memberChallengeResponseDtoList.add(memberChallengeResponseDto);
		}
		// 좋아요 순으로 내림차순 정렬
		Collections.sort(memberChallengeResponseDtoList, new Comparator<MemberChallengeResponseDto>() {
			@Override
			public int compare(MemberChallengeResponseDto o1, MemberChallengeResponseDto o2) {
				return o2.getLikeCount() - o1.getLikeCount();
			}
		});
		if (memberChallengeResponseDtoList.isEmpty()) {
			return SelectOriginalResponseDto.from(originalChallengeResponseDto, 0, null);
		}
		if (endIndex > memberChallengeResponseDtoList.size()) {
			endIndex = memberChallengeResponseDtoList.size();
		}
		return SelectOriginalResponseDto.from(originalChallengeResponseDto, memberChallengeResponseDtoList.size(),
			memberChallengeResponseDtoList.subList(startIndex, endIndex));
	}

	/**
	 * 신대득
	 * explain : 원본 챌린지 영상 보기
	 *
	 * @param challengeId : 원본 챌린지의 Id
	 * @return
	 */
	@Override
	public WatchOriginalChallengeResponseDto watchOriginalChallenge(Long challengeId) {
		Challenge challenge = challengeRepository.findByChallengeId(challengeId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));
		int joinCount = memberChallengeRepository.countByChallengeAndIsDelete(challenge, false);
		return WatchOriginalChallengeResponseDto.from(challenge, joinCount);
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 영상 보기
	 *
	 * @param memberChallengeId : 멤버 챌린지의 id
	 */
	@Override
	public WatchMemberChallengeResponseDto watchMemberChallenge(Long memberChallengeId, String memberId) {
		MemberChallenge memberChallenge = memberChallengeRepository.findByMemberChallengeIdAndIsDelete(
				memberChallengeId, false)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_CHALLENGE_NOT_FOUND_EXCEPTION));
		Challenge challenge = challengeRepository.findByChallengeId(memberChallenge.getChallenge().getChallengeId())
			.orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));
		int joinCount = memberChallengeRepository.countByChallengeAndIsDelete(challenge, false);
		WatchOriginalChallengeResponseDto watchOriginalChallengeResponseDto = WatchOriginalChallengeResponseDto.from(
			challenge, joinCount);
		int isLove = 0;
		log.info("curMemberId is : {}", memberId);
		if (memberId != null) {
			isLove = loveRepository.countByMemberChallengeAndMember_MemberIdAndIsLove(memberChallenge,
				Long.parseLong(memberId), true);
			log.info("curMemberId is : {}", memberId);
		}
		SelectMemberChallengeResponseDto selectMemberChallengeResponseDto = SelectMemberChallengeResponseDto.from(
			memberChallenge, isLove);
		return WatchMemberChallengeResponseDto.from(watchOriginalChallengeResponseDto,
			selectMemberChallengeResponseDto);
	}

	@Override
	public MemberChallengeListResponseDto categoryMemberChallenge(String category, Integer startIndex,
		Integer endIndex) {
		if (!category.equals("LIKE") && !category.equals("RECENT")) {
			throw new ApiException(ExceptionEnum.CATEGORY_NOT_FOUND_EXCEPTION);
		}
		List<MemberChallengeResponseDto> memberChallengeResponseDtoList = new ArrayList<>();
		List<MemberChallenge> memberChallengeList = memberChallengeRepository.findAll();
		if (memberChallengeList.isEmpty()) {
			throw new ApiException(ExceptionEnum.MEMBER_CHALLENGES_NOT_FOUND_EXCEPTION);
		}
		for (MemberChallenge memberChallenge : memberChallengeList) {
			int likeCount = loveRepository.countByMemberChallengeAndIsLove(memberChallenge, true);
			MemberChallengeResponseDto memberChallengeResponseDto = MemberChallengeResponseDto.from(memberChallenge,
				likeCount);
			memberChallengeResponseDtoList.add(memberChallengeResponseDto);
		}
		Comparator likeComparator = new Comparator<MemberChallengeResponseDto>() {
			@Override
			public int compare(MemberChallengeResponseDto o1, MemberChallengeResponseDto o2) {
				return o2.getLikeCount() - o1.getLikeCount();
			}
		};
		Comparator dateComparator = new Comparator<MemberChallengeResponseDto>() {
			@Override
			public int compare(MemberChallengeResponseDto o1, MemberChallengeResponseDto o2) {
				return o2.getMemberChallengeDate().compareTo(o1.getMemberChallengeDate());
			}
		};
		switch (category) {
			case "LIKE":
				Collections.sort(memberChallengeResponseDtoList, likeComparator);
				break;
			case "RECENT":
				Collections.sort(memberChallengeResponseDtoList, dateComparator);
				break;
		}
		if (memberChallengeResponseDtoList.isEmpty()) {
			return MemberChallengeListResponseDto.from(0, null);
		}
		if (endIndex > memberChallengeResponseDtoList.size()) {
			endIndex = memberChallengeResponseDtoList.size();
		}
		return MemberChallengeListResponseDto.from(memberChallengeResponseDtoList.size(),
			memberChallengeResponseDtoList.subList(startIndex, endIndex));
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 영상 등록
	 *
	 * @param challengeId : 원본 챌린지 Id
	 */
	@Override
	public void createMemberChallenge(Long challengeId, MemberChallengeRequestDto memberChallengeRequestDto,
		Long memberId) throws IOException, FirebaseAuthException {
		Challenge challenge = challengeRepository.findByChallengeId(challengeId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));
		Member member = memberRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.WRONG_MEMBER_EXCEPTION));
		String fileName = challenge.getTitle() + "_" + memberChallengeRequestDto.getNickName() + LocalDateTime.now();
		if (memberChallengeRepository.findByChallenge_ChallengeIdAndMember_MemberIdAndIsDelete(challengeId,
			member.getMemberId(), false).isPresent()) {
			throw new ApiException(ExceptionEnum.MEMBER_CHALLENGE_EXIST_EXCEPTION);
		}
		if (memberChallengeRequestDto.getMemberChallengeFile().isEmpty()) {
			throw new ApiException(ExceptionEnum.FILE_NOT_FOUND_EXCEPTION);
		}
		if (memberChallengeRequestDto.getMemberChallengeImg().isEmpty()) {
			throw new ApiException(ExceptionEnum.IMG_NOT_FOUND_EXCEPTION);
		}
		String fileUrl = fireBaseService.uploadFiles(memberChallengeRequestDto.getMemberChallengeFile(),
			fileName + "_file");
		String imgUrl = fireBaseService.uploadFiles(memberChallengeRequestDto.getMemberChallengeImg(),
			fileName + "_img");
		MemberChallenge memberChallenge = MemberChallenge.from(challenge, member, imgUrl, fileUrl);
		memberChallengeRepository.save(memberChallenge);
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 영상 삭제
	 *
	 * @param memberChallengeId : 멤버 챌린지 id
	 */
	@Override
	@Transactional
	public void deleteMemberChallenge(Long memberChallengeId) {
		MemberChallenge memberChallenge = memberChallengeRepository.findByMemberChallengeIdAndIsDelete(
				memberChallengeId, false)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_CHALLENGE_NOT_FOUND_EXCEPTION));

		List<Love> loveList = loveRepository.findAllByMemberChallenge_MemberChallengeIdAndIsLove(memberChallengeId,
			true);
		for (Love love : loveList) {
			love.updateIsLove(false);
		}

		memberChallenge.updateIsDelete(true);
		kafkaProducer.sendDeleteEvent(new DeleteMemberChallengeDto(memberChallenge.getMemberChallengeId()));
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 좋아요 등록
	 *
	 * @param memberChallengeId : 좋아요를 등록할 멤버 챌린지 id
	 * @param memberId          : 현재 로그인한 멤버의 id
	 */
	@Override
	@Transactional
	public void createLike(Long memberChallengeId, Long memberId) {
		Member member = memberRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.WRONG_MEMBER_EXCEPTION));
		MemberChallenge memberChallenge = memberChallengeRepository.findByMemberChallengeIdAndIsDelete(
				memberChallengeId, false)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_CHALLENGE_NOT_FOUND_EXCEPTION));
		Optional<Love> optionalLove = loveRepository.findByMemberChallengeAndMember(memberChallenge, member);
		if (optionalLove.isPresent()) {
			Love love = optionalLove.get();
			if (love.getIsLove() == false) {
				love.updateIsLove(true);
			}
		} else {
			loveRepository.save(Love.from(member, memberChallenge));
		}
	}

	@Override
	@Transactional
	public void deleteLike(Long memberChallengeId, Long memberId) {
		Member member = memberRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.WRONG_MEMBER_EXCEPTION));
		MemberChallenge memberChallenge = memberChallengeRepository.findByMemberChallengeIdAndIsDelete(
				memberChallengeId, false)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_CHALLENGE_NOT_FOUND_EXCEPTION));
		Love love = loveRepository.findByMemberChallengeAndMemberAndIsLove(memberChallenge, member, true)
			.orElseThrow(() -> new ApiException(ExceptionEnum.LOVE_NOT_FOUND_EXCEPTION));
		love.updateIsLove(false);
	}

	@Override
	public List<MemberChallengeResponseDto> getMyChallenges(Long memberId) {
		Member member = memberRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.WRONG_MEMBER_EXCEPTION));
		List<MemberChallenge> memberChallenges = memberChallengeRepository.findAllByMember_MemberIdAndIsDelete(
			member.getMemberId(), false);

		List<MemberChallengeResponseDto> memberChallengeResponseDtoList = memberChallenges.stream()
			.map(memberChallenge -> {
				int likeCount = loveRepository.countByMemberChallengeAndIsLove(memberChallenge, true);
				return MemberChallengeResponseDto.from(memberChallenge, likeCount);
			})
			.sorted(Comparator.comparing(MemberChallengeResponseDto::getMemberChallengeDate).reversed())
			.collect(Collectors.toList());
		return memberChallengeResponseDtoList;
	}
}
