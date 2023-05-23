package com.example.challengeservice.messageQueue;

import static com.example.challengeservice.messageQueue.Topics.*;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.challengeservice.messageQueue.dto.produce.ChallengeBadgeProduceDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {
	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendBadgeEvent(ChallengeBadgeProduceDto challengeBadgeProduceDto) {
		ObjectMapper mapper = new ObjectMapper();
		String jsonInString = "";
		try {
			jsonInString = mapper.writeValueAsString(challengeBadgeProduceDto);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		kafkaTemplate.send(SEND_CHALLENGE_BADGE_TO_MEMBER.getTopic(), jsonInString);
	}
}
