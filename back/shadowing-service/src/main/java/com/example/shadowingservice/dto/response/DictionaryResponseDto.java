package com.example.shadowingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DictionaryResponseDto {

	private String word;
	private String meaning;
	private String wordType;
	private String level;

}
