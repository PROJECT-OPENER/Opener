package com.example.memberservice.entity.redis;

import lombok.Getter;

@Getter
public enum RedisKey {
	AUTH_EMAIL("AUTH_EMAIL_"),
	SEND_CODE("SEND_CODE_");

	private String key;

	RedisKey(String key) {
		this.key = key;
	}
}

