package com.example.challengeservice.controller.challenge.auth;

import com.example.challengeservice.dto.BaseListResponseDto;
import com.example.challengeservice.dto.BaseResponseDto;
import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.dto.response.MemberChallengeResponseDto;
import com.example.challengeservice.service.ChallengeService;
import com.google.firebase.auth.FirebaseAuthException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthChallengeController {
	private final ChallengeService challengeService;

	/**
	 * 신대득
	 * explain : 멤버챌린지 영상 등록
	 *
	 * @param challengeId
	 * @param memberChallengeRequestDto
	 */
	@PostMapping("/challenges/{challengeId}/member-challenge")
	public ResponseEntity<BaseResponseDto> createMemberChallenge(HttpServletRequest request,
		@PathVariable Long challengeId, @ModelAttribute MemberChallengeRequestDto memberChallengeRequestDto)
		throws IOException, FirebaseAuthException {
		Long memberId = Long.parseLong(request.getHeader("memberId"));
		challengeService.createMemberChallenge(challengeId, memberChallengeRequestDto, memberId);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "나의 영상 등록 완료"));
	}

	/**
	 * 신대득
	 * explain : 회원 챌린지 선택 삭제
	 */
	@DeleteMapping("/member-challenges/{memberChallengeId}")
	public ResponseEntity<BaseResponseDto> deleteMemberChallenge(@PathVariable Long memberChallengeId) {
		challengeService.deleteMemberChallenge(memberChallengeId);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "나의 영상 삭제 완료"));
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 영상 좋아요 등록
	 */
	@PostMapping("/member-challenges/{memberChallengeId}/like")
	public ResponseEntity<BaseResponseDto> createLike(HttpServletRequest request,
		@PathVariable Long memberChallengeId) {
		Long memberId = Long.parseLong(request.getHeader("memberId"));
		challengeService.createLike(memberChallengeId, memberId);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "좋아요 성공"));
	}

	/**
	 * 신대득
	 * explain : 멤버 챌린지 영상 좋아요 해제
	 */
	@DeleteMapping("/member-challenges/{memberChallengeId}/like")
	public ResponseEntity<BaseResponseDto> deleteLike(HttpServletRequest request,
		@PathVariable Long memberChallengeId) {
		Long memberId = Long.parseLong(request.getHeader("memberId"));
		challengeService.deleteLike(memberChallengeId, memberId);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "좋아요 해제 성공"));
	}

	/**
	 * 신대득
	 * explain : 마이페이지 내가 업로드한 영상 조회
	 */
	@GetMapping("/member-challenges")
	public ResponseEntity<BaseListResponseDto<MemberChallengeResponseDto>> getMyChallenges(HttpServletRequest request) {
		// Todo : 멤버 id 하드코딩. 변경 필요
		String nickname = "2번";
		List<MemberChallengeResponseDto> myChallenges = challengeService.getMyChallenges(nickname);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<MemberChallengeResponseDto>(200, "나의 챌린지 리스트 조회 성공", myChallenges));
	}
}