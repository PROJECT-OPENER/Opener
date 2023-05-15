package com.example.memberservice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.memberservice.dto.BaseListResponseDto;
import com.example.memberservice.dto.BaseResponseDto;
import com.example.memberservice.dto.request.member.MemberInterestsRequestDto;
import com.example.memberservice.dto.request.member.NicknameRequestDto;
import com.example.memberservice.dto.request.member.PasswordRequestDto;
import com.example.memberservice.dto.request.member.ProfileImgRequestDto;
import com.example.memberservice.dto.response.member.BadgeResponseDto;
import com.example.memberservice.dto.response.member.ChallengeResponseDto;
import com.example.memberservice.service.MemberServiceImpl;

import feign.Response;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/auth/members/mypage")
public class MyPageController {

	private final MemberServiceImpl memberService;

	/**
	 * 김윤미
	 * explain : 사용자 닉네임 변경
	 * @param request
	 * @param nicknameRequestDto
	 * @return
	 */
	@PatchMapping("/nickname")
	public ResponseEntity<BaseResponseDto> updateNickname(HttpServletRequest request,
		@Valid @RequestBody NicknameRequestDto nicknameRequestDto) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		memberService.updateNickname(memberId, nicknameRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "닉네임 변경에 성공했습니다."));
	}

	/**
	 * 김윤미
	 * explain : 사용자 비밀번호 변경
	 * @param request
	 * @param passwordRequestDto
	 * @return
	 */
	@PatchMapping("/password")
	public ResponseEntity<BaseResponseDto> updatePassword(HttpServletRequest request,
		@Valid @RequestBody PasswordRequestDto passwordRequestDto) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		memberService.updatePassword(memberId, passwordRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "비밀번호 변경에 성공했습니다."));
	}

	/**
	 * 김윤미
	 * explain : 사용자 관심사 변경
	 * @param request
	 * @param memberInterestsRequestDto
	 * @return
	 */
	@PatchMapping("/interests")
	public ResponseEntity<BaseResponseDto> updateInterests(HttpServletRequest request,
		@RequestBody MemberInterestsRequestDto memberInterestsRequestDto) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		memberService.updateMemberInterests(memberId, memberInterestsRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "관심사 변경에 성공했습니다."));
	}

	/**
	 * 김윤미
	 * explain : 사용자 프로필 사진 변경
	 * @param request
	 * @param profileImgRequestDto
	 * @return
	 */
	@PostMapping("/image")
	public ResponseEntity<BaseResponseDto> updateProfileImg(HttpServletRequest request,
		@ModelAttribute ProfileImgRequestDto profileImgRequestDto) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		memberService.updateProfileImg(memberId, profileImgRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "프로필 사진 변경에 성공했습니다."));
	}

	/**
	 * 김윤미
	 * explain : 사용자 뱃지 조회
	 * @param request
	 * @return
	 */
	@GetMapping("/badge")
	public ResponseEntity<BaseResponseDto<BadgeResponseDto>> getBadge(HttpServletRequest request) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<BadgeResponseDto>(200, "내 뱃지 조회에 성공했습니다.",
				memberService.getBadge(memberId)));
	}

	/**
	 * 김윤미
	 * explain : 사용자 챌린지 목록 조회
	 * @param request
	 * @param pageable
	 * @return
	 */
	@GetMapping("/challenge")
	public ResponseEntity<BaseListResponseDto<ChallengeResponseDto>> getMyChallenges(HttpServletRequest request,
		Pageable pageable) {
		Long memberId = Long.valueOf(request.getHeader("memberId"));
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<ChallengeResponseDto>(200, "내 챌린지 목록 조회에 성공했습니다.",
				memberService.getMyChallenges(memberId, pageable)));
	}
}
