package com.example.challengeservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.challengeservice.entity.challenge.Challenge;
import com.example.challengeservice.entity.challenge.MemberChallenge;

@Repository
public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {
	int countByChallenge(Challenge challenge);

	int countByChallenge_ChallengeIdAndMember_MemberId(Long challengeId, Long memberId);

	@Query("select mc from MemberChallenge mc where mc.challenge.challengeId=:challengeId")
	List<MemberChallenge> findAllByChallengeId(Long challengeId);

	Optional<MemberChallenge> findByChallenge_ChallengeIdAndMember_MemberId(Long challengeId, Long memberId);

	Optional<MemberChallenge> findByMemberChallengeId(Long memberChallengeId);

	List<MemberChallenge> findAllByMember_MemberId(Long memberId);
}
