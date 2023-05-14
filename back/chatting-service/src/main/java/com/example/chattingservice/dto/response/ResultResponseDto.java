package com.example.chattingservice.dto.response;

import com.example.chattingservice.dto.request.SendMessageRequestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultResponseDto {
	private String nickname;
	private String message;
	private String contextResult;
	private String grammarResult;

	public ResultResponseDto(SendMessageRequestDto message) {
		this.nickname = message.getNickname();
		this.message = message.getMessage();
		this.contextResult = null; //TODO
		this.grammarResult = null; //TODO
	}
}
