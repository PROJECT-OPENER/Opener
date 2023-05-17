package com.example.memberservice.dto.response.member;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RankResponseDto {
	private String nickname;
	private int score;
	private int rank;
	private String profile;
}
