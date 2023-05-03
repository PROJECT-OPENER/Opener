package com.example.challengeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseDto<T> {

	private Integer code;

	private String message;

	private T data;

	public BaseResponseDto(int code, String message) {
		this.code = code;
		this.message = message;
	}
}