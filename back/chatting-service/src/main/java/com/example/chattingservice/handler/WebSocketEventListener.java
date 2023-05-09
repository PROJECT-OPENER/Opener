package com.example.chattingservice.handler;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
	private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		logger.info("[Connected] websocket");
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

		logger.info("[Disconnected] websocket");
	}
}