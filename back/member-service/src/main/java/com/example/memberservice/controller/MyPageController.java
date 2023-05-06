package com.example.memberservice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.memberservice.common.util.MemberUtil;
import com.example.memberservice.dto.BaseResponseDto;
import com.example.memberservice.dto.MemberDto;
import com.example.memberservice.dto.request.member.NicknameRequestDto;
import com.example.memberservice.service.MemberServiceImpl;

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
		MemberDto memberDto = MemberUtil.getMember(request.getHeader("member"));
		memberService.updateNickname(memberDto, nicknameRequestDto);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "닉네임 변경에 성공했습니다."));
	}
}
