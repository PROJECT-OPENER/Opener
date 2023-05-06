package com.example.memberservice.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;

import java.time.Duration;

import com.example.memberservice.dto.response.member.MemberResponseDto;
import com.example.memberservice.entity.member.Member;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate redisTemplate;

	/**
	 * 김윤미
	 * explain : key로 value 조회
	 * @param key : key
	 * @return : value
	 */
	public Object getData(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	/**
	 * 김윤미
	 * explain : key의 value 삭제
	 * @param key : key
	 */
	public void deleteData(String key) {
		redisTemplate.delete(key);
	}

	/**
	 * 김윤미
	 * explain : key값으로 value를 저장 (유효기간 설정)
	 * @param key : key
	 * @param value : value
	 * @param time : duration
	 */
	public void setDataWithExpiration(String key, String value, Long time) {
		if (this.getData(key) != null) {
			this.deleteData(key);
		}

		Duration expireDuration = Duration.ofSeconds(time);
		redisTemplate.opsForValue().set(key, value, expireDuration);
	}

	/**
	 * 김윤미
	 * explain : key로 boolean 타입의 value 저장
	 * @param key : key
	 * @param status : value
	 */
	public void setDataWithStatus(String key, boolean status) {
		if (this.getData(key) != null) {
			this.deleteData(key);
		}

		redisTemplate.opsForValue().set(key, status);
	}

	/**
	 * 김윤미
	 * explain : key에 해당하는 value의 존재 유무 조회
	 * @param key : key
	 * @return : boolean
	 */
	public boolean existsByKey(String key) {
		return redisTemplate.hasKey(key);
	}

	/**
	 * 김윤미
	 * explain : 사용자 객체를 저장 (유효기간 설정)
	 * @param key : key
	 * @param member : 사용자 정보
	 * @param time : duration
	 */
	public void setMemberWithDuration(String key, Member member, Long time) {
		MemberResponseDto setMemberDto = new MemberResponseDto(member);
		Duration expireDuration = Duration.ofSeconds(time);
		redisTemplate.opsForValue().set(key, setMemberDto, expireDuration);
	}
}


