package com.example.shadowingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthShadowingCategoryDto {

	private Long videoId;
	private String thumbnailUrl;
	private String engSentence;
	private String korSentence;
	private boolean isMarked;

}
