package com.example.shadowingservice.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoMainRoadMapResponseDto {

	private int stepNo;
	private ThemeRoadMapResponseDto themeRoadMapResponseDto;

}
