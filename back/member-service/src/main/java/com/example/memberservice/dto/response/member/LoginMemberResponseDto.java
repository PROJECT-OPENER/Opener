package com.example.memberservice.dto.response.member;

import java.util.Set;

import com.example.memberservice.dto.InterestDto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginMemberResponseDto {
	private String email;
	private String nickname;
	private String profile;
	private Set<InterestDto> interests;
}
