package com.example.shadowingservice.dto.response;

import java.time.LocalTime;
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
public class ShadowingDetailDto {

	private LocalTime start;
	private LocalTime end;
	private String engCaption;
	private String korCaption;

}
