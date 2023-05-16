package com.example.challengeservice.dto.response;

import com.example.challengeservice.entity.challenge.MemberChallenge;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SelectMemberChallengeResponseDto {
    private Long memberChallengeId;
    private String memberChallengeNickname;
    private String memberChallengeUrl;
    @JsonProperty(value = "isLike")
    private Boolean isLike;

    public static SelectMemberChallengeResponseDto from(MemberChallenge memberChallenge, int isLove) {
        boolean isLike = true;
        if (isLove == 0) {
            isLike = false;
        }
        return SelectMemberChallengeResponseDto.builder()
                .memberChallengeId(memberChallenge.getMemberChallengeId())
                .memberChallengeNickname(memberChallenge.getMember().getNickname())
                .memberChallengeUrl(memberChallenge.getMemberChallengeUrl())
                .isLike(isLike)
                .build();
    }
}
