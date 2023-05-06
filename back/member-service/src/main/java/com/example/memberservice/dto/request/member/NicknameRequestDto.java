package com.example.memberservice.dto.request.member;

import com.example.memberservice.common.annotation.Nickname;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NicknameRequestDto {
	@Nickname
	private String nickname;
}
