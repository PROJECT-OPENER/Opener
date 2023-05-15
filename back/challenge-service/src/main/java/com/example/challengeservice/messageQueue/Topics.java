package com.example.challengeservice.messageQueue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Topics {
	DELETE_MEMBER_CHALLENGE_TO_MEMBER("challenge_topic_member_challenge"),
	;

	private String topic;

}
