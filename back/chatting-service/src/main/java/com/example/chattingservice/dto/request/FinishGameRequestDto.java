package com.example.chattingservice.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FinishGameRequestDto {
	private List<SendMessageRequestDto> messageList;
	private ScoreRequestDto score;
	private String otherNickname;

}
