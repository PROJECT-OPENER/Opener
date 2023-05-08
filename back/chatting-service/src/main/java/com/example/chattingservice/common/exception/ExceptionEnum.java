package com.example.chattingservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
	INTERESTS_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, -300, "현재 관심사 목록이 없습니다."),
	;
	private final HttpStatus status;
	private final int code;
	private final String message;

}

