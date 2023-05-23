package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Food implements TipType {
	TIP1("최근에 맛있게 먹은 음식에 대해 얘기해보세요.",
		"Talk about the food you ate recently."),
	TIP2("당신의 나라를 대표하는 음식에 대해 얘기해보세요.",
		"Talk about the food that represents your country."),
	TIP3("만들어본 음식 중에 가장 맛있었던 음식에 대해 얘기해보세요.", "Talk about the most delicious food you've ever made."),
	;

	private String tipTitle;
	private String tipDescription;

}
