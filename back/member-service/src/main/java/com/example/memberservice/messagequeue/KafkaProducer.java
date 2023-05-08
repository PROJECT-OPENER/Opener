package com.example.memberservice.messagequeue;

import static com.example.memberservice.messagequeue.Topic.*;

import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {
	private final KafkaTemplate<String, Object> kafkaTemplate;

	public void sendSignUpMember(SignUpMemberRequestDto signUpMemberRequestDto) {
		kafkaTemplate.send(SEND_MEMBER.getTopic(), signUpMemberRequestDto);
	}
}
