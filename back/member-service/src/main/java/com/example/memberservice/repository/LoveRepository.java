package com.example.memberservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.challenge.Love;

@Repository
public interface LoveRepository extends JpaRepository<Love, Long> {
	long countByMemberChallenge_MemberChallengeId(Long memberChallengeId);
}
