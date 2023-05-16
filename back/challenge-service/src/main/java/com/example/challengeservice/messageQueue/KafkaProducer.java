package com.example.challengeservice.messageQueue;

import static com.example.challengeservice.messageQueue.Topics.*;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.challengeservice.messageQueue.dto.produce.DeleteMemberChallengeDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {
	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendDeleteEvent(DeleteMemberChallengeDto deleteMemberChallengeDto) {

		ObjectMapper mapper = new ObjectMapper();
		String jsonInString = "";
		String value = null;
		try {
			jsonInString = mapper.writeValueAsString(deleteMemberChallengeDto);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		kafkaTemplate.send(DELETE_MEMBER_CHALLENGE_TO_MEMBER.getTopic(), jsonInString, value);
	}
}
