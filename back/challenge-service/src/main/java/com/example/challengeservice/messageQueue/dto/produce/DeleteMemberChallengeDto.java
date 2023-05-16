package com.example.challengeservice.messageQueue.dto.produce;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteMemberChallengeDto implements Serializable {
	private Long member_challenge_id;
}
