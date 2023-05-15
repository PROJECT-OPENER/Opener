package com.example.memberservice.messagequeue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.entity.member.Badge;
import com.example.memberservice.entity.member.Member;
import com.example.memberservice.repository.BadgeRepository;
import com.example.memberservice.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {
	private final BadgeRepository badgeRepository;
	private final MemberRepository memberRepository;
	private final ObjectMapper objectMapper;

	@KafkaListener(topics = "SEND_SCORE_TO_MEMBER")
	@Transactional
	public void processMessage(String kafkaMessage) {
		log.info("Kafka Message: ===> " + kafkaMessage);

		Map<Object, Object> map = new HashMap<>();
		try {
			map = objectMapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {
			});
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		List<Map<String, Object>> scores = (List<Map<String, Object>>)map.get("scores");
		for (Map<String, Object> score : scores) {
			Member member = memberRepository.findByNickname((String)score.get("nickname"))
				.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

			member.updateScore((Integer)score.get("score"));
			Badge badge = badgeRepository.findByMember_MemberId(member.getMemberId()).orElseGet(() -> {
				Badge newBadge = Badge.builder()
					.member(member)
					.attendanceCount(0)
					.shadowingCount(0)
					.challengeCount(0)
					.gameCount(0)
					.build();
				return badgeRepository.save(newBadge);
			});

			badge.updateGameCount();
		}
	}
}
