package com.example.chattingservice.controller;

import com.example.chattingservice.service.ChattingServiceImpl;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthChattingController {

	private final ChattingServiceImpl chattingService;

	@MessageMapping("/user-chat")
	public void createWaiting(@Header("Authorization") String token, @Payload String message) {
		chattingService.createWaiting(token);
	}
}
