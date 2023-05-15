package com.example.memberservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.memberservice.entity.challenge.MemberChallenge;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {
	Page<MemberChallenge> findByMember_MemberIdOrderByCreateDateDesc(Long memberId, Pageable pageable);
}
