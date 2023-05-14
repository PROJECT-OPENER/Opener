package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class ScoreResponseDto {
	private String nickname;
	private int currentScore;
	private int changeScore;
	private int contextScore;
	private int grammarScore;
	private boolean wordUsed;
}
