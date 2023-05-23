package com.example.shadowingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadMapResponseDto {

	private Long videoId;
	private String engSentence;
	private String korSentence;
	private String stepTheme;
	private int sentenceNo;

}
