package com.example.challengeservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    WRONG_MEMBER_EXCEPTION(HttpStatus.NOT_FOUND, -999, "회원정보를 찾을 수 없습니다."),
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "런타임 에러"),
    CHALLENGES_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -401, "챌린지 목록을 조회할 수 없습니다."),
    CHALLENGE_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -402, "선택한 챌린지의 원본을 얻을 수 없습니다."),
    MEMBER_CHALLENGE_EXIST_EXCEPTION(HttpStatus.BAD_REQUEST, -411, "이미 해당 유저의 챌린지가 존재합니다."),
    FILE_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -412, "영상 파일을 확인할 수 없습니다."),
    IMG_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -413, "영상 썸네일을 확인할 수 없습니다.");
    private final HttpStatus status;
    private final int code;
    private final String message;

}