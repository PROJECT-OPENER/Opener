package com.example.chattingservice.handler;

import static com.example.chattingservice.entity.redis.RedisKey.*;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

import com.example.chattingservice.service.RedisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisExpirationListener implements MessageListener {

	private final RedisService redisService;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		log.info("onMessage : {}", message.toString());
		String msg = message.toString();
		if (msg.contains(EXPIRED.getKey())) {
			redisService.deleteWaitingRoom(msg);
		}
	}
}
