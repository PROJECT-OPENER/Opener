package com.example.chattingservice.messagequeue.dto.produce;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import com.example.chattingservice.messagequeue.dto.ScoreDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinishGameProduceDto implements Serializable {
	private List<ScoreDto> scores;

	public FinishGameProduceDto(ScoreDto... scores) {
		this.scores = Arrays.asList(scores);
	}
}
