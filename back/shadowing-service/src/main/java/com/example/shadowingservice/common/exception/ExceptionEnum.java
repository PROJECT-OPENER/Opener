package com.example.shadowingservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
	RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "로드맵 쉐도잉 목록을 조회할 수 없습니다.");
	private final HttpStatus status;
	private final int code;
	private final String message;

}