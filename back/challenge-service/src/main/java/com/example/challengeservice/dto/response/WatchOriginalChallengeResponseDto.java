package com.example.challengeservice.dto.response;

import com.example.challengeservice.entity.challenge.Challenge;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WatchOriginalChallengeResponseDto {
    private Long challengeId;
    private String title;
    private String challengeUrl;
    private String startTime;
    private String endTime;
    private int joinCount;

    public static WatchOriginalChallengeResponseDto from(Challenge challenge, int joinCount) {
        return WatchOriginalChallengeResponseDto.builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .challengeUrl(challenge.getChallengeUrl())
                .startTime(challenge.getStartTime())
                .endTime(challenge.getEndTime())
                .joinCount(joinCount)
                .build();
    }

}
