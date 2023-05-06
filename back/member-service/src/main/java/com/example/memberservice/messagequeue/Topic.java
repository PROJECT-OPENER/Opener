package com.example.memberservice.messagequeue;

import lombok.Getter;

@Getter
public enum Topic {
	SEND_MEMBER("member_topic");
	private String topic;

	Topic(String topic) {
		this.topic = topic;
	}
}
