package com.example.memberservice.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.memberservice.common.util.MemberUtil;
import com.example.memberservice.dto.BaseResponseDto;
import com.example.memberservice.dto.MemberDto;
import com.example.memberservice.service.MemberServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/auth/members")
public class AuthMemberController {
	private final MemberServiceImpl memberService;

	@PostMapping("/interests")
	public ResponseEntity<BaseResponseDto> setInterests(HttpServletRequest request) {
		String memberStr = request.getHeader("member");
		MemberDto memberDto = MemberUtil.getMember(memberStr);
		memberService.setInterests();
		return null;
	}
}
