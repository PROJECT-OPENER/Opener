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
    private String korCaption;
    private String engCaption;
    private String captionTime;
    private String challengeUrl;
    private int joinCount;

    public static WatchOriginalChallengeResponseDto from(Challenge challenge, int joinCount) {
        return WatchOriginalChallengeResponseDto.builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .korCaption(challenge.getKorCaption())
                .engCaption(challenge.getEngCaption())
                .captionTime(challenge.getCaptionTime())
                .challengeUrl(challenge.getChallengeUrl())
                .joinCount(joinCount)
                .build();
    }

}
