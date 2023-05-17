package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Daily implements TipType {
	TIP1("휴일에 즐기는 것들에 대해 얘기해보세요", "Talk about the things you enjoy on holidays"),
	TIP2("일상생활 중 소소한 행복에 대해 얘기해보세요", "Talk about the small happiness in your daily life"),
	TIP3("당신의 습관에 대해 얘기해보세요",
		"Talk about your habits"),
	TIP4("최근에 흥미로운 일이 있으면 얘기해주세요", "Tell me about anything interesting lately"),
	;

	private String tipTitle;
	private String tipDescription;

}
