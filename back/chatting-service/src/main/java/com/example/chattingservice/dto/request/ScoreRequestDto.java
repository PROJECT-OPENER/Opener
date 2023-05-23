package com.example.chattingservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreRequestDto {
	private String myContextScore;
	private int myGrammarScore;
	private boolean myWordUsed;
	private String otherContextScore;
	private int otherGrammarScore;
	private boolean otherWordUsed;
}
