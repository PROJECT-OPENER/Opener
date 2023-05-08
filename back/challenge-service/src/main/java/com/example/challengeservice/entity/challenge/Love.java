package com.example.challengeservice.entity.challenge;

import com.example.challengeservice.entity.BaseEntity;
import com.example.challengeservice.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "love")
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
