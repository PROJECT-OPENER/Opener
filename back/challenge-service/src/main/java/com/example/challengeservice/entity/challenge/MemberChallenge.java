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

import com.example.challengeservice.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @ManyToOne(targetEntity = Challenge.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;
    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @Column(name = "member_challenge_img")
    private String memberChallengeImg;
    @Column(name = "member_challenge_url")
    private String memberChallengeUrl;

    public static MemberChallenge from(Challenge challenge, Member member, String memberChallengeImg, String memberChallengeUrl) {
        return builder()
                .challenge(challenge)
                .member(member)
                .memberChallengeImg(memberChallengeImg)
                .memberChallengeUrl(memberChallengeUrl)
                .build();
    }
}
