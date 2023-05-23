package com.example.memberservice.entity.challenge;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.memberservice.entity.BaseEntity;
import com.example.memberservice.entity.member.Member;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "memberChallenge")
public class MemberChallenge extends BaseEntity {
	@Id
	@GeneratedValue
	@Column(name = "member_challenge_id")
	private Long memberChallengeId;
	@Column(name = "challenge_id")
	private Long challengeId;
	@ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;
	@Column(name = "member_challenge_img", length = 1000)
	private String memberChallengeImg;
	@Column(name = "member_challenge_url", length = 1000)
	private String memberChallengeUrl;
	@Column(name = "is_delete")
	private Boolean isDelete;
}

