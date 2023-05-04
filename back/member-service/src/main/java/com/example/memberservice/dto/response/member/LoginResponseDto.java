package com.example.memberservice.dto.response.member;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.http.HttpHeaders;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponseDto {
	private String accessToken;
	private String nickname;
	private boolean hasInterest;

	public HttpHeaders toHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("accessToken", this.accessToken);
		try {
			headers.set("nickname", URLEncoder.encode(this.nickname, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return headers;
	}
}
