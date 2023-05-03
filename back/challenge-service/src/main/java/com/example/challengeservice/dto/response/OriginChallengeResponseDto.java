package com.example.challengeservice.dto.response;

import com.example.challengeservice.entity.challenge.Challenge;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OriginChallengeResponseDto {
	private Long challengeId;
	private String title;
	private String challengeImg;
	private int joinCount;
	public static OriginChallengeResponseDto from(Challenge challenge, int joinCount){
		return OriginChallengeResponseDto.builder()
			.challengeId(challenge.getChallengeId())
			.title(challenge.getTitle())
			.challengeImg(challenge.getChallengeImg())
			.joinCount(joinCount)
			.build();
	}
}
