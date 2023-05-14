package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Music implements TipType {
	TIP1("가장 좋아하는 음악 장르와 그 이유에 대해 이야기해주세요.", "Talk about your favorite music genre and why you enjoy it."),
	TIP2("좋아하는 음악 아티스트와 그들이 영감을 준 이유에 대해 나눠주세요.", "Share your favorite music artist and why they inspire you."),
	TIP3("삶에서 음악이 차지하는 역할에 대해 이야기해주세요.", "Discuss the role of music in your life."),
	TIP4("참석한 콘서트나 음악 페스티벌에 대한 경험에 대해 말해주세요.",
		"Tell me about a concert or music festival you have attended and your experience.");

	private String tipTitle;
	private String tipDescription;

}
