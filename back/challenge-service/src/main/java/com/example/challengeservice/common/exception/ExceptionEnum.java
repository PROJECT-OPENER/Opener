package com.example.challengeservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "런타임 에러"),
    CHALLENGES_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -401, "챌린지 목록을 조회할 수 없습니다."),
    CHALLENGE_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -402, "선택한 챌린지의 원본을 얻을 수 없습니다."),
    ;
    private final HttpStatus status;
    private final int code;
    private final String message;

}