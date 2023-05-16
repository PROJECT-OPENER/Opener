package com.example.chattingservice.service;

import java.util.List;

import com.example.chattingservice.dto.request.FinishGameRequestDto;
import com.example.chattingservice.dto.response.InterestResponseDto;
import com.example.chattingservice.dto.response.TipResponseDto;

public interface ChattingService {
	/** 전체 관심사 조회 **/
	List<InterestResponseDto> getInterests();

	/** 대기방 생성 **/
	void createWaiting(String token);

	/** 게임 종료 **/
	void finishGame(String token, FinishGameRequestDto finishGameRequestDto, String roomId);

	/** Tip 문장 조회 **/
	List<TipResponseDto> getTips(Long interestId);

	/** 게임 중 ping **/
	void reportHere(String token, String roomId);
}
