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
	int countByChallengeAndIsDelete(Challenge challenge, Boolean isDelete);

	List<MemberChallenge> findAllByIsDelete(Boolean isDelete);

	@Query("select mc from MemberChallenge mc where mc.challenge.challengeId=:challengeId and mc.isDelete=:isDelete")
	List<MemberChallenge> findAllByChallengeIdAndIsDelete(Long challengeId, Boolean isDelete);

	Optional<MemberChallenge> findByChallenge_ChallengeIdAndMember_MemberIdAndIsDelete(Long challengeId, Long memberId,
		Boolean isDelete);

	Optional<MemberChallenge> findByMemberChallengeIdAndIsDelete(Long memberChallengeId, Boolean isDelete);

	List<MemberChallenge> findAllByMember_MemberIdAndIsDelete(Long memberId, Boolean isDelete);
}
