package com.example.chattingservice.service;

import java.util.List;

import com.example.chattingservice.dto.response.InterestResponseDto;

public interface ChattingService {
	/** 전체 관심사 조회 **/
	List<InterestResponseDto> getInterests();

	/** 대기방 생성 **/
	void createWaiting(String token);
}
