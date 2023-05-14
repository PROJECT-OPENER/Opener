package com.example.chattingservice.dto.response;

import com.example.chattingservice.entity.chat.enums.Tips;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class TipResponseDto {
	private String tipTitle;
	private String tipDescription;

	public TipResponseDto(Tips tips) {
		this.tipTitle = tips.getTipType().getTipTitle();
		this.tipDescription = tips.getTipType().getTipDescription();
	}
}
