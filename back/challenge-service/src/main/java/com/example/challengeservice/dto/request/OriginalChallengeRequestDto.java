package com.example.challengeservice.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OriginalChallengeRequestDto {
	private String title;
	private String challengeUrl;
	private String startTime;
	private String endTime;
	private String caption;
}