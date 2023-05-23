package com.example.memberservice.entity.challenge;

import com.example.memberservice.entity.BaseEntity;
import com.example.memberservice.entity.member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "love")
@Builder
public class Love extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "love_id")
	private Long loveId;
	@ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;
	@ManyToOne(targetEntity = MemberChallenge.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "member_challenge_id")
	private MemberChallenge memberChallenge;
	@Column(name = "is_love")
	private Boolean isLove;
}



