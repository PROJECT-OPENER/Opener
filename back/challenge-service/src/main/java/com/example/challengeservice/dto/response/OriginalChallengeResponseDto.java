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
public class OriginalChallengeResponseDto {
    private Long challengeId;
    private String title;
    private String challengeUrl;
    private int joinCount;

    public static OriginalChallengeResponseDto from(Challenge challenge, int joinCount) {
        return OriginalChallengeResponseDto.builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .challengeUrl(challenge.getChallengeUrl())
                .joinCount(joinCount)
                .build();
    }
}
