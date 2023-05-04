package com.example.challengeservice.dto.response;

import com.example.challengeservice.entity.challenge.MemberChallenge;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberChallengeResponseDto {
    Long memberChallengeId;
    String memberChallengeImg;
    int likeCount;

    public static MemberChallengeResponseDto from(MemberChallenge memberChallenge, int likeCount) {
        return MemberChallengeResponseDto.builder()
                .memberChallengeId(memberChallenge.getMemberChallengeId())
                .memberChallengeImg(memberChallenge.getMemberChallengeImg())
                .likeCount(likeCount)
                .build();
    }
}
