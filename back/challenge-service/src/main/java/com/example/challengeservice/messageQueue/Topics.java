package com.example.challengeservice.messageQueue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Topics {
	SEND_CHALLENGE_BADGE_TO_MEMBER("challenge_topic_badge"),
	;

	private String topic;

}
