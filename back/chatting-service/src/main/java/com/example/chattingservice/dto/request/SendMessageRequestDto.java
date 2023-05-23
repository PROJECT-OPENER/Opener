package com.example.chattingservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequestDto {
	private int turn;
	private String nickname;
	private String message;
	private String roomId;
}
