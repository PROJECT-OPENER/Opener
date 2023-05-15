package com.example.memberservice.entity.member;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.annotations.DynamicUpdate;

import com.example.memberservice.entity.BaseEntity;
import com.example.memberservice.entity.member.enums.Gender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@DynamicUpdate
@Table(name = "member")
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "email", nullable = false, unique = true)
	@Email
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "nickname", nullable = false, unique = true)
	private String nickname;

	@Column(name = "birth", nullable = false)
	private LocalDate birth;

	@Column(name = "gender", nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "profile")
	private String profile;

	@Column(name = "score")
	private int score;

	@Column(name = "login_date")
	private LocalDate loginDate;

	public void updateNickname(String nickname) {
		this.nickname = nickname;
	}

	public void updatePassword(String password) {
		this.password = password;
	}

	public void updateProfile(String profile) {
		this.profile = profile;
	}

	public void updateLoginDate(LocalDate loginDate) {
		this.loginDate = loginDate;
	}

	public void updateScore(int score) {
		this.score = score;
	}
}
