package com.example.memberservice.controller;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.memberservice.common.annotation.Email;
import com.example.memberservice.dto.BaseResponseDto;
import com.example.memberservice.service.MemberServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/members")
public class MemberController {
	private final MemberServiceImpl memberService;

	@GetMapping("/email")
	public ResponseEntity<BaseResponseDto<?>> checkEmail(@Email @RequestParam(value = "email") String email) {
		memberService.checkEmail(email);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "사용 가능한 이메일입니다."));
	}
}
