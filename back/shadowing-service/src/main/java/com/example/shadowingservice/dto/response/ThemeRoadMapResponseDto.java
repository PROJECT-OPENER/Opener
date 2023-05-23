package com.example.shadowingservice.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeRoadMapResponseDto {
	private String stepTheme;
	private List<RoadMapResponseDto> roadMapResponseDtoList;

}
