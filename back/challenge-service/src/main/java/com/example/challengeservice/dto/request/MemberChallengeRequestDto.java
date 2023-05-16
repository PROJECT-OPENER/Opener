package com.example.challengeservice.dto.request;

import lombok.*;

import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberChallengeRequestDto {
	String nickName;
	MultipartFile memberChallengeFile;
	MultipartFile memberChallengeImg;
}