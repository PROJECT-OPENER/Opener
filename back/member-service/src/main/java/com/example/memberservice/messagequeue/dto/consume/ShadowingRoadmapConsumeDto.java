package com.example.memberservice.messagequeue.dto.consume;

import java.io.Serializable;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShadowingRoadmapConsumeDto implements Serializable {
	private Long memberId;
	private int stepNo;
	private int stepTheme;
	private int sentenceNo;

	public ShadowingRoadmapConsumeDto(Map<Object, Object> map) {
		this.memberId = Long.valueOf((Integer)map.get("memberId"));
		this.stepNo = (Integer)map.get(("stepNo"));
		this.stepTheme = (Integer)map.get(("stepTheme"));
		this.sentenceNo = (Integer)map.get(("sentenceNo"));
	}

}

