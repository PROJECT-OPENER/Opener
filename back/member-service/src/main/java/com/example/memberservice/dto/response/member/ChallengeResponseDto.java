package com.example.memberservice.dto.response.member;

import java.time.LocalDateTime;

import com.example.memberservice.entity.challenge.MemberChallenge;

import lombok.Getter;

@Getter
public class ChallengeResponseDto {
	private Long memberChallengeId;
	private String memberChallengeImg;
	private Long likeCount;
	private LocalDateTime memberChallengeDate;

	public ChallengeResponseDto(MemberChallenge memberChallenge) {
		this.memberChallengeId = memberChallenge.getMemberChallengeId();
		this.memberChallengeImg = memberChallenge.getMemberChallengeImg();
		this.memberChallengeDate = memberChallenge.getCreateDate();
	}

	public void setLikeCount(Long likeCount) {
		this.likeCount = likeCount;
	}
}
