package com.example.shadowingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShadowingCategoryDto {

	private Long videoId;
	private String thumbnailUrl;
	private String engSentence;
	private String korSentence;

}
