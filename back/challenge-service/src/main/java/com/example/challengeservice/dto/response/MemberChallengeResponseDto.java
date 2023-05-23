package com.example.challengeservice.dto.response;

import com.example.challengeservice.entity.challenge.MemberChallenge;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberChallengeResponseDto {
    private Long memberChallengeId;
    private String memberChallengeImg;
    private int likeCount;
    private LocalDateTime memberChallengeDate;


    public static MemberChallengeResponseDto from(MemberChallenge memberChallenge, int likeCount) {
        return MemberChallengeResponseDto.builder()
                .memberChallengeId(memberChallenge.getMemberChallengeId())
                .memberChallengeImg(memberChallenge.getMemberChallengeImg())
                .likeCount(likeCount)
                .memberChallengeDate(memberChallenge.getCreateDate())
                .build();
    }
}
