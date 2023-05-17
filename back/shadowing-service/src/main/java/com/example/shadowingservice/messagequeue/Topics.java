package com.example.shadowingservice.messagequeue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Topics {
	SEND_SHADOWING_BADGE_TO_MEMBER("shadowing_topic_badge"),
	SEND_ROADMAP_TO_MEMBER("shadowing_topic_roadmap");

	private String topic;

}
