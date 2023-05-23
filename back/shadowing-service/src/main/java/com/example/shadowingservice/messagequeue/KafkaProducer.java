package com.example.shadowingservice.messagequeue;

import static com.example.shadowingservice.messagequeue.Topics.*;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.shadowingservice.messagequeue.dto.produce.ShadowingBadgeProduceDto;
import com.example.shadowingservice.messagequeue.dto.produce.ShadowingRoadmapProduceDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendBadgeEvent(ShadowingBadgeProduceDto shadowingBadgeProduceDto) {
		ObjectMapper mapper = new ObjectMapper();
		String jsonInString = "";
		try {
			jsonInString = mapper.writeValueAsString(shadowingBadgeProduceDto);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		kafkaTemplate.send(SEND_SHADOWING_BADGE_TO_MEMBER.getTopic(), jsonInString);
	}

	public void sendRoadmapEvent(ShadowingRoadmapProduceDto shadowingRoadmapProduceDto) {
		ObjectMapper mapper = new ObjectMapper();
		String jsonInString = "";
		try {
			jsonInString = mapper.writeValueAsString(shadowingRoadmapProduceDto);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		kafkaTemplate.send(SEND_ROADMAP_TO_MEMBER.getTopic(), jsonInString);
	}

}
