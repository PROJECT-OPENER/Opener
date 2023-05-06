package com.example.shadowingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShadowingVideoInterestDto {

	private Long shadowingVideoInterestId;

	private Long shadowingVideoId;

	private Long interestId;

}
