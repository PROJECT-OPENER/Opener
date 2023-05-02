package com.example.memberservice.service;

import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;

public interface MemberService {

	void checkEmail(String email);

	void checkNickname(String nickname);

	void sendEmailCode(String email);

	void checkEmailCode(CheckEmailCodeRequestDto checkEmailCodeRequestDto);

	void signUpMember(SignUpMemberRequestDto signUpMemberRequestDto);

	LoginResponseDto login(LoginRequestDto loginRequestDto);
}