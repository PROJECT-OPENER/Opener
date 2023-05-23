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
public class AuthNoRoadMapResponseDto {
	private int stepNo;
	private List<AuthThemeRoadMapResponseDto> authThemeRoadMapResponseDtoList;

}
