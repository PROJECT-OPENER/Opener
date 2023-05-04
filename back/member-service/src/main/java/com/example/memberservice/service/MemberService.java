package com.example.memberservice.service;

import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;

public interface MemberService {
	/** 이메일 중복 체크 **/
	void checkEmail(String email);
	/** 닉네임 중복 체크 **/
	void checkNickname(String nickname);
	/** 이메일 인증 코드 전송 **/
	void sendEmailCode(String email);
	/** 이메일 인증 코드 검증 **/
	void checkEmailCode(CheckEmailCodeRequestDto checkEmailCodeRequestDto);
	/** 회원가입 **/
	void signUpMember(SignUpMemberRequestDto signUpMemberRequestDto);
	/** 로그인 **/
	LoginResponseDto login(LoginRequestDto loginRequestDto);
}
