package com.example.shadowingservice.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class NoRoadMapResponseDto {

	private int stepNo;
	private ThemeRoadMapResponseDto themeRoadMapResponseDto;

}
