package com.example.chattingservice.entity.redis;

import lombok.Getter;

@Getter
public enum RedisKey {
	WAITING("WAITING"),
	GAMING("GAMING"),
	EXPIRED("EXPIRED"),
	;

	private String key;

	RedisKey(String key) {
		this.key = key;
	}
}


