package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Trip implements TipType {
	TIP1("여행 경험에 대해 나눠봐주세요.", "Share your travel experiences."),
	TIP2("가장 좋아하는 여행지에 대해 이야기해주세요.", "Discuss your favorite travel destination."),
	TIP3("기억에 남는 여행에 대해 말해주세요.", "Talk about a memorable trip you've taken."),
	TIP4("여행 팁과 추천 사항을 나눠주세요.", "Share your travel tips and recommendations."),
	TIP5("여행의 이점에 대해 이야기해주세요.", "Discuss the benefits of traveling.");

	private String tipTitle;
	private String tipDescription;

}
