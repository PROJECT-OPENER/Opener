package com.example.challengeservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiExceptionEntity {
	private int code;
	private String message;

	@Override
	public String toString() {
		return "ApiExceptionEntity [errorCode=" + code + ", errorMessage=" + message + "]";
	}

}