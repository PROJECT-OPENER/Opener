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
	public void processGameScore(String kafkaMessage) {
		log.info("Process Game Score : ===> " + kafkaMessage);

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

	@KafkaListener(topics = "challenge_topic_badge")
	@Transactional
	public void processChallengeBadge(String kafkaMessage) {
		log.info("Process Challenge Badge : ===> " + kafkaMessage);

		Map<Object, Integer> map = new HashMap<>();
		try {
			map = objectMapper.readValue(kafkaMessage, new TypeReference<Map<Object, Integer>>() {
			});
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		Long memberId = Long.valueOf(map.get("memberId"));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

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

		badge.updateChallengeCount();
	}

	@KafkaListener(topics = "shadowing_topic_badge")
	@Transactional
	public void processShadowingBadge(String kafkaMessage) {
		log.info("Process Shadowing Badge : ===> " + kafkaMessage);

		Map<Object, Integer> map = new HashMap<>();
		try {
			map = objectMapper.readValue(kafkaMessage, new TypeReference<Map<Object, Integer>>() {
			});
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		Long memberId = Long.valueOf(map.get("memberId"));
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.MEMBER_NOT_FOUND_EXCEPTION));

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

		badge.updateShadowingCount();
	}
}
