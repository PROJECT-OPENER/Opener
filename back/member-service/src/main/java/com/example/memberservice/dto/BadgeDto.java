package com.example.memberservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BadgeDto {
	private int level;
	private int score;

	public BadgeDto(int count) {
		int level = 1;
		int standard = 10;
		int beforeLevelScore = 0;
		int nextLevelScore = 10;

		while (nextLevelScore <= count) {
			level++;
			beforeLevelScore = nextLevelScore;
			nextLevelScore = ((level * (level + 1)) / 2) * standard;
		}
		int myScore = count - beforeLevelScore;
		int interval = nextLevelScore - beforeLevelScore;
		double pct = ((double)myScore / interval) * 100;
		this.level = level;
		this.score = (int)Math.round(pct);
	}
}
