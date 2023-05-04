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

	private Long video_id;
	private String eng_sentence;
	private String kor_sentence;
	private String stepTheme;
	private int sentenceNo;

}
