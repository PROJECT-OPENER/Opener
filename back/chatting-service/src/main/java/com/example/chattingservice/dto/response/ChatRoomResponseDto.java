package com.example.chattingservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@ToString
public class ChatRoomResponseDto {
	private String roomId;
	private String otherNickname;
	private String otherImgUrl;
	private String startNickname;
	private String keyword;
	private String exampleEng;
	private String exampleKor;

	public void setOtherInfo(String otherNickname, String otherImgUrl) {
		this.otherNickname = otherNickname;
		this.otherImgUrl = otherImgUrl;
	}
}
