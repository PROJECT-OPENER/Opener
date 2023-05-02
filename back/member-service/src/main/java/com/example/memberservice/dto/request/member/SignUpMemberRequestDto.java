package com.example.memberservice.dto.request.member;

import java.time.LocalDate;

import com.example.memberservice.common.annotation.Birth;
import com.example.memberservice.common.annotation.Email;
import com.example.memberservice.common.annotation.GenderEnum;
import com.example.memberservice.common.annotation.Nickname;
import com.example.memberservice.common.annotation.Password;
import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.enums.Gender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SignUpMemberRequestDto {
	@Email
	private String email;

	@Password
	private String password;

	@Nickname
	private String nickname;

	@Birth
	private String birth;

	@GenderEnum
	private String gender;

	public Member toEntity(String password) {
		return Member.builder()
			.email(this.getEmail())
			.password(password)
			.nickname(this.getNickname())
			.birth(LocalDate.parse(this.getBirth()))
			.gender(Gender.valueOf(this.getGender()))
			.build();
	}
}
