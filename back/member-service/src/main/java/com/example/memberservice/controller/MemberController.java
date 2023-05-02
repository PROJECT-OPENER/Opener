package com.example.memberservice.controller;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.memberservice.common.annotation.Email;
import com.example.memberservice.common.annotation.Nickname;
import com.example.memberservice.dto.BaseResponseDto;
import com.example.memberservice.dto.request.member.EmailRequestDto;
import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.request.member.EmailRequestDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;
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

	@GetMapping("/nickname")
	public ResponseEntity<BaseResponseDto<?>> checkNickname(@Nickname @RequestParam String nickname) {
		memberService.checkNickname(nickname);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "사용 가능한 닉네임입니다."));
	}

	@PostMapping("/email-code")
	public ResponseEntity<BaseResponseDto<?>> sendEmailCode(@Valid @RequestBody EmailRequestDto emailRequestDto) {
		memberService.sendEmailCode(emailRequestDto.getEmail());
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "인증 코드를 전송했습니다."));
	}

	@PostMapping("/email")
	public ResponseEntity<BaseResponseDto<?>> checkEmailCode(
		@Valid @RequestBody CheckEmailCodeRequestDto checkEmailCodeRequestDto) {
		memberService.checkEmailCode(checkEmailCodeRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "이메일 인증에 성공했습니다."));
	}

	@PostMapping
	public ResponseEntity<BaseResponseDto<?>> signUpMember(
		@Valid @RequestBody SignUpMemberRequestDto signUpMemberRequestDto) {
		memberService.signUpMember(signUpMemberRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "회원가입에 성공했습니다."));
	}

	@PostMapping("/login")
	public ResponseEntity<BaseResponseDto<?>> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
		LoginResponseDto loginResponseDto = memberService.login(loginRequestDto);
		HttpHeaders headers = new HttpHeaders();
		headers.add("accessToken", loginResponseDto.getAccessToken());
		headers.add("nickname", loginResponseDto.getNickname());
		return null;
		// return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "이메일 인증에 성공했습니다."));
	}

}