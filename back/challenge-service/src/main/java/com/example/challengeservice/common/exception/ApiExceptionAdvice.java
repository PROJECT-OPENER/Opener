package com.example.challengeservice.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;


@RestControllerAdvice
public class ApiExceptionAdvice {

	/**
	 * API 에러 핸들링입니다.
	 * 아래의 경우로 에러를 발생하면 해당 예외처리기에서 클라이언트로 응답합니다.
	 *
	 * ex)
	 * throw new ApiException(ExceptionEnum.RUNTIME_EXCEPTION);
	 * @param e
	 * @return
	 */
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

	/**
	 * 런타임 예외에 대한 처리입니다.
	 * @return
	 */
    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ApiExceptionEntity> runTimeExceptionHandler() {
        ApiException e = new ApiException(ExceptionEnum.RUNTIME_EXCEPTION);
        return new ResponseEntity<>(
                new ApiExceptionEntity(
                        e.getError().getCode(),
                        e.getError().getMessage()
                ),
                e.getError().getStatus()
        );
    }

}