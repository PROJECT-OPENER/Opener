package com.example.memberservice.dto;

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

import lombok.Getter;

@Getter
public class MemberDto implements Serializable {
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

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Member toEntity(MemberDto memberDto) {
		Member member = Member.builder()
			.memberId(memberDto.getMemberId())
			.email(memberDto.getEmail())
			.password(memberDto.getPassword())
			.nickname(memberDto.getNickname())
			.birth(memberDto.getBirth())
			.gender(memberDto.getGender())
			.profile(memberDto.getProfile())
			.score(memberDto.getScore())
			.loginDate(memberDto.getLoginDate())
			.build();
		member.setBaseDateInfo(this.createDate, this.lastModifiedDate);

		return member;
	}
}
