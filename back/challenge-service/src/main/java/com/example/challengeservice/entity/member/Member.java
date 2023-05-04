package com.example.challengeservice.entity.member;

import com.example.challengeservice.entity.BaseEntity;
import com.example.challengeservice.entity.member.enums.Gender;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "member")
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "email", nullable = false, unique = true)
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
}
