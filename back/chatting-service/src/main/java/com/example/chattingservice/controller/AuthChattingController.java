package com.example.chattingservice.controller;

import com.example.chattingservice.dto.request.SendMessageRequestDto;
import com.example.chattingservice.service.ChattingServiceImpl;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
	public void sendMessage(SendMessageRequestDto sendMessageRequestDto) {
		messagingTemplate.convertAndSend("/sub/user-chat/rooms" + sendMessageRequestDto.getRoomId(),
			sendMessageRequestDto);
	}
}
