package com.example.chattingservice.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BaseListResponseDto<T> {

	private Integer code;

	private String message;

	private List<T> data;

	public BaseListResponseDto(int code, String message) {
		this.code = code;
		this.message = message;
	}
}

