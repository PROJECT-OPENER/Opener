package com.example.challengeservice.dto.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberChallengeListResponseDto {
    int totalLength;
    List<MemberChallengeResponseDto> memberChallengeList;

    public static MemberChallengeListResponseDto from(int totalLength, List<MemberChallengeResponseDto> memberChallengeList) {
        return MemberChallengeListResponseDto.builder()
                .totalLength(totalLength)
                .memberChallengeList(memberChallengeList)
                .build();
    }
}
