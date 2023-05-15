package com.example.chattingservice.messagequeue.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScoreDto implements Serializable {
	private String nickname;
	private int score;
}
