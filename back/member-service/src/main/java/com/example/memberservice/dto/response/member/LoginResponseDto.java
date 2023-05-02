package com.example.memberservice.dto.response.member;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponseDto {
	private String accessToken;
	private String nickname;
	private boolean hasInterest;
}
