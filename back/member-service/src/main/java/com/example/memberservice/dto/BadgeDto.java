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
		int threshold = standard - 1;

		while (threshold < count) {
			level++;
			threshold += standard * level;
		}

		int max = (level * (level - 1) / 2) * standard;

		this.level = level;
		this.score = max == 0 ? count : count % max;
	}
}
