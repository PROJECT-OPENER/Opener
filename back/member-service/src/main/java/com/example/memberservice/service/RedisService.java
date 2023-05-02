package com.example.memberservice.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate redisTemplate;

	public Object getData(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public void deleteData(String key) {
		redisTemplate.delete(key);
	}

	public void setDataWithExpiration(String key, String value, Long time) {
		if (this.getData(key) != null) {
			this.deleteData(key);
		}

		Duration expireDuration = Duration.ofSeconds(time);
		redisTemplate.opsForValue().set(key, value, expireDuration);
	}

	public void setDataWithStatus(String key, boolean status) {
		if (this.getData(key) != null) {
			this.deleteData(key);
		}

		redisTemplate.opsForValue().set(key, status);
	}

	public boolean existsByKey(String key) {
		return redisTemplate.hasKey(key);
	}
}


