package com.example.challengeservice.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WatchMemberChallengeResponseDto {
    private WatchOriginalChallengeResponseDto watchOriginalChallengeResponseDto;
    private SelectMemberChallengeResponseDto curMemberChallenge;

    public static WatchMemberChallengeResponseDto from(WatchOriginalChallengeResponseDto watchOriginalChallengeResponseDto, SelectMemberChallengeResponseDto selectMemberChallengeResponseDto) {
        return WatchMemberChallengeResponseDto.builder()
                .watchOriginalChallengeResponseDto(watchOriginalChallengeResponseDto)
                .curMemberChallenge(selectMemberChallengeResponseDto)
                .build();
    }
}
