package com.example.memberservice.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {

	@ExceptionHandler({ApiException.class})
	public ResponseEntity<ApiExceptionEntity> apiExceptionHandler(final ApiException e) {

		return new ResponseEntity<>(
			new ApiExceptionEntity(
				e.getError().getCode(),
				e.getError().getMessage()
			),
			e.getError().getStatus()
		);
	}
}

