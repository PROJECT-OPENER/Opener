package com.example.shadowingservice.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
	RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "런타임 에러"),
	WRONG_MEMBER_EXCEPTION(HttpStatus.NOT_FOUND, -999, "회원정보를 찾을 수 없습니다."),
	SHADOWING_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "쉐도잉 영상을 조회할 수 없습니다."),
	RECOMMENDATIONS_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -201,
		"메인 페이지 추천 문장 목록을 조회할 수 없습니다."),
	MAIN_ROADMAPS_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -201, "메인 페이지 로드맵 목록을 조회할 수 없습니다."),
	ROADMAPS_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, 201, "쉐도잉 로드맵 목록을 조회할 수 없습ㄴ디ㅏ."),
	SHADOWINGS_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -202, "쉐도잉 목록을 조회할 수 없습니다."),
	CATEGORY_NOT_FOUND_EXCEPTION(HttpStatus.BAD_REQUEST, -202, "카테고리를 조회할 수 없습니다."),
	OUT_OF_INDEX_EXCEPTION(HttpStatus.BAD_REQUEST, -203, "인덱스 범위를 벗어났습니다."),
	VIDEOID_NOT_MATCH_EXCEPTION(HttpStatus.BAD_REQUEST, -204, "videoId가 일치하지 않습니다.");
	private final HttpStatus status;
	private final int code;
	private final String message;

}