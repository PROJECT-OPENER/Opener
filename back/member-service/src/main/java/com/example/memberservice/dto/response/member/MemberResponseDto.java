package com.example.memberservice.dto.response.member;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.enums.Gender;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto implements Serializable {
	private Long memberId;
	private String email;
	private String password;
	private String nickname;
	@JsonSerialize(using = LocalDateSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate birth;
	private Gender gender;
	private String profile;
	private int score;
	@JsonSerialize(using = LocalDateSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	private LocalDate loginDate;

	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime createDate;

	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime lastModifiedDate;

	@Builder
	public MemberResponseDto(Member member) {
		this.memberId = member.getMemberId();
		this.email = member.getEmail();
		this.password = member.getPassword();
		this.nickname = member.getNickname();
		this.birth = member.getBirth();
		this.gender = member.getGender();
		this.profile = member.getProfile();
		this.score = member.getScore();
		this.loginDate = member.getLoginDate();
		this.createDate = member.getCreateDate();
		this.lastModifiedDate = member.getLastModifiedDate();
	}
}
