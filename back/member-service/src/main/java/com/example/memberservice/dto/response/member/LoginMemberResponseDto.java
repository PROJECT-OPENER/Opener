package com.example.memberservice.dto.response.member;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginMemberResponseDto {
	private String email;
	private String nickname;
	private String profile;

	/**
	 * TODO: 사용자 관심사
	 */
	// private Set<String> interests;
}
