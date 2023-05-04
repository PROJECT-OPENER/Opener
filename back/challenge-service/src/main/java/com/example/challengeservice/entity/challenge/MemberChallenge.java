package com.example.challengeservice.entity.challenge;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.challengeservice.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "memberChallenge")
public class MemberChallenge extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "member_challenge_id")
    private Long memberChallengeId;
    @ManyToOne(targetEntity = Challenge.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "CHALLENGE_ID")
    private Challenge challenge;
    @Column(name = "member_id", nullable = false)
    private Long memberId;
    @Column(name = "member_challenge_img")
    private String memberChallengeImg;
    @Column(name = "member_challenge_url")
    private String memberChallengeUrl;
}
