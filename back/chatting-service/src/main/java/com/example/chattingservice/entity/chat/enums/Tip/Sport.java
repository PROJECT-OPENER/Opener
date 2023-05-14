package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Sport implements TipType {
	TIP1("생생한 스포츠 경험에 대해 나누어주세요.", "Share your experience attending a live sports event."),
	TIP2("당신을 영감을 주는 스포츠 인물과 그 이유에 대해 이야기해보세요.", "Talk about a sports personality who has inspired you and why."),
	TIP3("좋아하는 스포츠 팀에 대해 이야기해주세요.", "Talk about your favorite sports team."),
	TIP4("자신이 스포츠를 하며 기억에 남는 순간에 대해 묘사해주세요.", "Describe a memorable moment from your own experience playing a sport."),
	;

	private String tipTitle;
	private String tipDescription;

}
