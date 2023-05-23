package com.example.chattingservice.common.exception;

public class ApiException extends RuntimeException {
	private ExceptionEnum error;

	public ApiException(ExceptionEnum e) {
		super(e.getMessage());
		this.error = e;
	}

	public ExceptionEnum getError() {
		return error;
	}
}

