package com.example.chattingservice.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class FinishGameResponseDto {
	private List<ResultResponseDto> result;
	private ScoreResponseDto myScore;
	private ScoreResponseDto otherScore;
	private String winnerNickname;
	private String otherNickname;
}
