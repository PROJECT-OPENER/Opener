package com.example.chattingservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiExceptionEntity {
	private int code;
	private String message;
}

