package com.example.challengeservice.controller.challenge;

import java.io.IOException;
import java.util.List;

import com.example.challengeservice.dto.BaseResponseDto;
import com.example.challengeservice.dto.request.OriginalChallengeRequestDto;
import com.example.challengeservice.dto.response.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.challengeservice.dto.BaseListResponseDto;
import com.example.challengeservice.service.ChallengeService;
import com.google.firebase.auth.FirebaseAuthException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("")
public class ChallengeController {
	private final ChallengeService challengeService;

	/**
	 * 신대득
	 * explain : 챌린지 영상 등록 (관리자용 API)
	 */
	@PostMapping("/challenges")
	public ResponseEntity<BaseResponseDto> createOriginalChallenge(
		@RequestBody OriginalChallengeRequestDto originalChallengeRequestDto) {
		challengeService.createOriginalChallenge(originalChallengeRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "원본 챌린지 등록 완료"));
	}

	/**
	 * 신대득
	 * explain : 원본 영상 정보 조회
	 */
	@GetMapping("/challenges")
	public ResponseEntity<BaseListResponseDto<OriginalChallengeResponseDto>> getOriginalChallenges() {
		List<OriginalChallengeResponseDto> originChallenges = challengeService.getOriginalChallenges();
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<OriginalChallengeResponseDto>(200, "챌린지 리스트 호출 성공", originChallenges));
	}

	/**
	 * 신대득
	 * explain : 원본 챌린지 선택 조회
	 *
	 * @param challengeId : 입장
	 * @return
	 */
	@GetMapping("/challenges/{challengeId}")
	public ResponseEntity<BaseResponseDto<SelectOriginalResponseDto>> selectOriginalChallenge(
		@PathVariable Long challengeId, @RequestParam("startIndex") Integer startIndex,
		@RequestParam("endIndex") Integer endIndex) {
		SelectOriginalResponseDto selectOriginalResponseDto = challengeService.selectOriginalChallenge(challengeId,
			startIndex, endIndex + 1);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<SelectOriginalResponseDto>(200, "챌린지 선택 조회 성공", selectOriginalResponseDto));
	}

	/**
	 * 신대득
	 * explain : 원본 영상 보기
	 */
	@GetMapping("/watch/challenges/{challengeId}")
	public ResponseEntity<BaseResponseDto<WatchOriginalChallengeResponseDto>> watchOriginalChallenge(
		@PathVariable Long challengeId) {
		WatchOriginalChallengeResponseDto watchOriginalChallengeResponseDto = challengeService.watchOriginalChallenge(
			challengeId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<WatchOriginalChallengeResponseDto>(200, "원본 챌린지 영상 보기 성공",
				watchOriginalChallengeResponseDto));
	}

	/**
	 * 신대득
	 * 멤버 챌린지 영상 목록 조회
	 */
	@GetMapping("/member-challenges")
	public ResponseEntity<BaseResponseDto<MemberChallengeListResponseDto>> categoryMemberChallenge(
		@RequestParam("category") String category, @RequestParam("startIndex") Integer startIndex,
		@RequestParam("endIndex") Integer endIndex) {
		MemberChallengeListResponseDto memberChallengeListResponseDto = challengeService.categoryMemberChallenge(
			category, startIndex, endIndex + 1);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<MemberChallengeListResponseDto>(200, "챌린지 카테고리 조회 성공",
				memberChallengeListResponseDto));
	}

	/**
	 * 신대득
	 * 멤버 챌린지 영상 보기
	 */
	@GetMapping("/watch/member-challenges/{memberChallengeId}/video")
	public ResponseEntity<BaseResponseDto<WatchMemberChallengeResponseDto>> watchMemberChallenge(
		HttpServletRequest request, @PathVariable Long memberChallengeId) {
		String memberId = request.getHeader("memberId");
		WatchMemberChallengeResponseDto watchMemberChallengeResponseDto = challengeService.watchMemberChallenge(
			memberChallengeId, memberId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<WatchMemberChallengeResponseDto>(200, "멤버 챌린지 영상 보기 성공",
				watchMemberChallengeResponseDto));
	}
}
