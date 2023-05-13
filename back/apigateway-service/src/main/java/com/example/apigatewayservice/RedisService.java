package com.example.apigatewayservice;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate redisTemplate;

	public String getMemberId(String key) {
		return redisTemplate.opsForValue().get(key).toString();
	}
}
