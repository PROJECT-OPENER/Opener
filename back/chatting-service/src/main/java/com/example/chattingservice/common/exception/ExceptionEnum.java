package com.example.chattingservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
	/**
	 * TODO : 에러코드 상의 - 임시 에러코드 부여
	 */
	MEMBER_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, -399, "가입된 사용자가 아닙니다."),
	INTERESTS_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, -300, "현재 관심사 목록이 없습니다."),
	;
	private final HttpStatus status;
	private final int code;
	private final String message;

}

