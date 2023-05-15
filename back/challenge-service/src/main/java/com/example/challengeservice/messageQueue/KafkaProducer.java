package com.example.challengeservice.messageQueue;

import static com.example.challengeservice.messageQueue.Topics.*;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {
	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendDeleteEvent(Long recordId) {
		String key = recordId.toString(); // 삭제할 레코드의 고유 식별자를 키로 사용
		String value = "delete"; // 삭제 이벤트를 나타내는 값
		log.info("key is{}", key);
		kafkaTemplate.send(DELETE_MEMBER_CHALLENGE_TO_MEMBER.getTopic(), key, value);
	}
}
