package com.example.memberservice.common.util;

import org.springframework.mail.SimpleMailMessage;

public class MailUtil {

	public static String makeRandomNumber(int length) {
		char[] ch = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '@'};

		StringBuilder sb = new StringBuilder();

		int idx = 0;
		for (int i = 0; i < length; i++) {
			idx = (int)(ch.length * Math.random());
			sb.append(ch[idx]);
		}

		return sb.toString();
	}

	public static SimpleMailMessage setMailForAuth(String email, String authNumber) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Opne'ur 이메일 인증번호");
		message.setText("인증코드 : " + authNumber);

		return message;
	}

}

