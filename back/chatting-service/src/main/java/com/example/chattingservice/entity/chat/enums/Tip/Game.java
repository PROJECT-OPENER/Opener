package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Game implements TipType {
	TIP1("오락과 여가 활동에 많은 시간을 투자하는 것의 장단점에 대해 이야기해주세요.",
		"Discuss the pros and cons of spending a lot of time on entertainment and leisure activities."),
	TIP2("레크리에이션 활동에 참여하면서 기억에 남는 경험에 대해 말해주세요.",
		"TTell me about a memorable experience you had while participating in a recreational activity."),
	TIP3("가장 좋아하는 오락과 그것을 즐기는 이유에 대해 이야기해주세요.", "Share your favorite entertainment and why you enjoy it."),
	;

	private String tipTitle;
	private String tipDescription;

}
