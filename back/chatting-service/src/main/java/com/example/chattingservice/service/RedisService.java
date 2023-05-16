package com.example.chattingservice.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import com.example.chattingservice.entity.chat.WaitingRoom;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate redisTemplate;

	/**
	 * 김윤미
	 * explain : 현재 사용자 조회
	 * @param key
	 * @return
	 */
	public String getMemberId(String key) {
		return redisTemplate.opsForValue().get(key).toString();
	}

	/**
	 * 김윤미
	 * explain : 대기열에서 채팅방 제거
	 * @param key
	 * @param room
	 */
	public void deleteRoom(String key, WaitingRoom room) {
		if (existRoom(key, room)) {
			redisTemplate.opsForZSet().remove(key, room);
		}
	}

	/**
	 * 김윤미
	 * explain : 대기방 존재 유무 조회
	 * @param key
	 * @param room
	 * @return
	 */
	public boolean existRoom(String key, WaitingRoom room) {
		return redisTemplate.opsForZSet().rank(key, room) == null ? false : true;
	}

	/**
	 * 김윤미
	 * explain : 대기방 목록 존재 유무 조회
	 * @param key
	 * @param min
	 * @param max
	 * @return
	 */
	public boolean existRooms(String key, int min, int max) {
		return redisTemplate.opsForZSet().count(key, min, max) > 0 ? true : false;
	}

	/**
	 * 김윤미
	 * explain : 점수 구간에 맞는 대기방 목록 조회
	 * @param key
	 * @param min
	 * @param max
	 * @return
	 */
	public Set<WaitingRoom> getWaitingRoom(String key, int min, int max) {
		return redisTemplate.opsForZSet().rangeByScore(key, min, max);
	}

	/**
	 * 김윤미
	 * explain : 대기방 생성 - 대기열에 추가
	 * 신대득
	 * explain : 대기방에 duration 추가
	 * @param key
	 * @param chatRoom
	 * @param score
	 */
	public void addWaitingRoom(String key, WaitingRoom chatRoom, int score) {
		redisTemplate.opsForZSet().add(key, chatRoom, score);
		redisTemplate.expire(key + ":" + chatRoom, 5L, TimeUnit.SECONDS);
	}

	/**
	 * 김윤미
	 * explain : 대기방 전체 삭제
	 * @param key
	 */
	public void deleteRooms(String key) {
		redisTemplate.opsForZSet().removeRange(key, 0, -1);
	}

	/**
	 * 김윤미
	 * explain : 게임 중 상태 등록
	 * @param key
	 * @param opposite
	 */
	public void setGameStatus(String key, String opposite) {
		Duration expireDuration = Duration.ofSeconds(5L);
		redisTemplate.opsForValue().set(key, opposite, expireDuration);
	}

	/**
	 * 김윤미
	 * explain : 생존 신고 후 상대 닉네임 반환
	 * @param key
	 * @return
	 */
	public String reportAndGetOpposite(String key) {
		Duration expireDuration = Duration.ofSeconds(5L);
		return (String)redisTemplate.opsForValue().getAndExpire(key, expireDuration);
	}

	/**
	 * 김윤미
	 * explain : 상대가 게임 중인지 여부 반환
	 * @param key
	 * @return
	 */
	public boolean existsOpposite(String key) {
		return redisTemplate.opsForValue().get(key) != null ? true : false;
	}
}

