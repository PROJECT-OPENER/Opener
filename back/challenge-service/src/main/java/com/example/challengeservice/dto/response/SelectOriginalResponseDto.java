package com.example.challengeservice.dto.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SelectOriginalResponseDto {
    OriginalChallengeResponseDto originalChallengeResponseDto;
    int totalLength;
    List<MemberChallengeResponseDto> memberChallengeResponseDtoList;

    public static SelectOriginalResponseDto from(OriginalChallengeResponseDto originalChallengeResponseDto, int totalLength, List<MemberChallengeResponseDto> memberChallengeResponseDtoList) {
        return SelectOriginalResponseDto.builder()
                .originalChallengeResponseDto(originalChallengeResponseDto)
                .totalLength(totalLength)
                .memberChallengeResponseDtoList(memberChallengeResponseDtoList)
                .build();
    }
}
