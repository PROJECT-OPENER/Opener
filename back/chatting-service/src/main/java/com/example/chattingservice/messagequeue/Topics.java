package com.example.chattingservice.messagequeue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Topics {
	SEND_SCORE_TO_MEMBER("SEND_SCORE_TO_MEMBER"),
	;

	private String topic;

}
