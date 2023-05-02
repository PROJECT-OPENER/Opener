package com.example.memberservice.dto.request.member;

import com.example.memberservice.common.annotation.Email;
import com.example.memberservice.common.annotation.Password;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LoginRequestDto {
	@Email
	private String email;

	@Password
	private String password;
}
