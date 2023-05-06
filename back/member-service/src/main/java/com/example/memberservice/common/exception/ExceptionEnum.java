package com.example.memberservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
	EMAIL_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, -100, "이미 사용 중인 이메일입니다."),
	INVALID_EMAIL_EXCEPTION(HttpStatus.BAD_REQUEST, -101, "유효한 이메일 형식이 아닙니다."),
	INVALID_PASSWORD_EXCEPTION(HttpStatus.BAD_REQUEST, -102, "유효한 비밀번호 형식이 아닙니다."),
	NICKNAME_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, -103, "이미 사용 중인 닉네임입니다."),
	EMAIL_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -104, "이메일을 입력해주세요."),
	PASSWORD_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -105, "비밀번호를 입력해주세요."),
	NICKNAME_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -106, "닉네임을 입력해주세요."),
	BIRTH_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -107, "생년월일을 입력해주세요."),
	INVALID_DATE_EXCEPTION(HttpStatus.BAD_REQUEST, -108, "유효한 날짜가 아닙니다."),
	GENDER_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -109, "성별을 입력해주세요."),
	INVALID_GENDER_EXCEPTION(HttpStatus.BAD_REQUEST, -110, "유효한 성별이 아닙니다."),
	AUTH_CODE_NULL_EXCEPTION(HttpStatus.BAD_REQUEST, -111, "인증 코드를 입력해주세요."),
	NOT_AUTHENTICATED_EMAIL_EXCEPTION(HttpStatus.BAD_REQUEST, -112, "인증되지 않은 이메일입니다."),
	INVALID_EMAIL_CODE_EXCEPTION(HttpStatus.BAD_REQUEST, -113, "인증 코드가 만료되었습니다."),
	WRONG_EMAIL_CODE_EXCEPTION(HttpStatus.BAD_REQUEST, -114, "인증 코드가 틀렸습니다."),
	SEND_EMAIL_FAIL_EXCEPTION(HttpStatus.BAD_REQUEST, -115, "이메일 발송에 실패했습니다."),
	MEMBER_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, -116, "가입된 이메일이 아닙니다."),
	WRONG_PASSWORD_EXCEPTION(HttpStatus.BAD_REQUEST, -117, "비밀번호가 틀렸습니다."),
	INSUFFICIENT_INTERESTS_EXCEPTION(HttpStatus.BAD_REQUEST, -119, "2개 이상의 관심사를 선택해주세요."),
	INTEREST_NOT_FOUND(HttpStatus.NOT_FOUND, -122, "존재하지 않는 관심사입니다."),
	;
	private final HttpStatus status;
	private final int code;
	private final String message;

}

