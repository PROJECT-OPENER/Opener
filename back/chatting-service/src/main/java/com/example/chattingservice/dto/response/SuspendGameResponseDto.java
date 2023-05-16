package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class SuspendGameResponseDto {
	private String message;
	private String roomId;
	private int currentScore;
	private int changeScore;
}
