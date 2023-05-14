package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Read implements TipType {
	TIP1("가장 좋아하는 책과 그 책에서 즐긴 점에 대해 이야기해주세요.", "Share your favorite book and what you enjoyed about it."),
	TIP2("독서가 당신의 삶에 미친 영향에 대해 이야기해주세요.", "Discuss how reading has impacted your life."),
	TIP3("어떤 주제나 문제에 대한 시각을 바꾼 책에 대해 말해주세요.",
		"Tell me about a book that has changed your perspective on a certain topic or issue."),
	TIP4("독서 습관과 일정에 대해 나눠주세요.", "Share your reading habits and routines."),
	;

	private String tipTitle;
	private String tipDescription;

}
