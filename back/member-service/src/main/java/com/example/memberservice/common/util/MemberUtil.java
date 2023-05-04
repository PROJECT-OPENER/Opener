package com.example.memberservice.common.util;

import java.net.URLDecoder;

import com.example.memberservice.dto.MemberDto;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MemberUtil {
	public static MemberDto getMember(String member) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			MemberDto memberDto = mapper.readValue(member, MemberDto.class);
			memberDto.setNickname(URLDecoder.decode(memberDto.getNickname(), "UTF-8"));
			return memberDto;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
