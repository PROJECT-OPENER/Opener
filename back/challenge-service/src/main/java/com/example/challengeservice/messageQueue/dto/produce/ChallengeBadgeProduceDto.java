package com.example.challengeservice.messageQueue.dto.produce;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeBadgeProduceDto implements Serializable {
	@JsonProperty("member_id")
	private Long memberId;
}
