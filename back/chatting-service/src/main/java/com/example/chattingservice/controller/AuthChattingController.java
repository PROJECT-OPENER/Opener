package com.example.chattingservice.controller;

import com.example.chattingservice.dto.BaseListResponseDto;
import com.example.chattingservice.dto.request.FinishGameRequestDto;
import com.example.chattingservice.dto.request.SendMessageRequestDto;
import com.example.chattingservice.dto.response.TipResponseDto;
import com.example.chattingservice.service.ChattingServiceImpl;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthChattingController {

	private final ChattingServiceImpl chattingService;
	private final SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/user-chat")
	public void createWaiting(@Header("Authorization") String token, @Payload String message) {
		chattingService.createWaiting(token);
	}

	/**
	 * 송신
	 * @param sendMessageRequestDto
	 */
	@MessageMapping("/user-chat/rooms/{room-id}")
	public void sendMessage(@Header("Authorization") String token, @DestinationVariable("room-id") String roomId,
		@Payload SendMessageRequestDto sendMessageRequestDto) {
		messagingTemplate.convertAndSend("/sub/user-chat/rooms/" + roomId,
			sendMessageRequestDto);
	}

	@MessageMapping("/user-chat/rooms/result/{room-id}")
	public void finishGame(@Header("Authorization") String token, @Payload FinishGameRequestDto finishGameRequestDto,
		@DestinationVariable("room-id") String roomId) {
		chattingService.finishGame(token, finishGameRequestDto, roomId);
	}

	/**
	 * 김윤미
	 * explain : 관심사 팁 한글, 영어 문장 목록 조회
	 * @param interestId
	 * @return
	 */
	@GetMapping("/auth/ai-chat/interests/{interest-id}")
	public ResponseEntity<BaseListResponseDto<TipResponseDto>> getTips(
		@PathVariable(value = "interest-id") Long interestId) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<TipResponseDto>(200, "관심사 정보를 불러오는 데 성공했습니다.",
				chattingService.getTips(interestId)));
	}

}
