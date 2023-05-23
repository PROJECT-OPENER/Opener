package com.example.chattingservice.entity.chat.enums.Tip;

import com.example.chattingservice.entity.chat.enums.TipType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Animation implements TipType {
	TIP1("제일 재미있게 봤던 애니메이션에 대해 얘기해보세요",
		"Talk about the anime you enjoyed the most."),
	TIP2("인상깊었던 애니메이션 장면에 대해 얘기해보세요",
		"Talk about an animated scene that impressed you"),
	TIP3("어릴 때 자주 봤던 애니메이션에 대해 얘기해주세요", "Tell me about the anime you watched a lot when you were young."),
	;

	private String tipTitle;
	private String tipDescription;

}
