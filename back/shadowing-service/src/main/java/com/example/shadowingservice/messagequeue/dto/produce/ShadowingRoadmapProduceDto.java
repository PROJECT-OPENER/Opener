package com.example.shadowingservice.messagequeue.dto.produce;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShadowingRoadmapProduceDto implements Serializable {
	private Long memberId;
	private int stepNo;
	private int stepTheme;
	private int sentenceNo;
}