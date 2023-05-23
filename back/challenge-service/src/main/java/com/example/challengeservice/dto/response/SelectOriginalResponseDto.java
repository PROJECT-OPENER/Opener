package com.example.challengeservice.dto.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SelectOriginalResponseDto {
    private OriginalChallengeResponseDto original;
    private int totalLength;
    private List<MemberChallengeResponseDto> memberChallengeList;

    public static SelectOriginalResponseDto from(OriginalChallengeResponseDto originalChallengeResponseDto, int totalLength, List<MemberChallengeResponseDto> memberChallengeResponseDtoList) {
        return SelectOriginalResponseDto.builder()
                .original(originalChallengeResponseDto)
                .totalLength(totalLength)
                .memberChallengeList(memberChallengeResponseDtoList)
                .build();
    }
}
