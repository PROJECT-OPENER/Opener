package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Movie implements TipType {
	TIP1("영화에 대한 개인적인 의견과 감상을 공유하세요.", "Share your personal opinions and impressions of the movie."),
	TIP2("좋아하는 장면, 인상 깊은 대사, 흥미로운 플롯 등에 대해 이야기해보세요.",
		"Discuss your favorite scenes, memorable quotes, or intriguing plot points."),
	TIP3("최근에 본 영화에 대해 이야기해보세요.", "Talk about a movie you recently watched.");

	private String tipTitle;
	private String tipDescription;

}
