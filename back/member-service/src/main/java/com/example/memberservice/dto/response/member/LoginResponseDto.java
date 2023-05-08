package com.example.memberservice.dto.response.member;

import org.springframework.http.HttpHeaders;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponseDto {
	private String accessToken;
	private boolean hasInterest;
	private LoginMemberResponseDto loginMemberResponseDto;

	public HttpHeaders toHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("accessToken", this.accessToken);
		return headers;
	}
}
