package com.example.challengeservice.repository;

import com.example.challengeservice.entity.challenge.Love;
import com.example.challengeservice.entity.challenge.MemberChallenge;
import com.example.challengeservice.entity.member.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoveRepository extends JpaRepository<Love, Long> {
	int countByMemberChallengeAndIsLove(MemberChallenge memberChallenge, Boolean isLove);

	int countByMemberChallengeAndMember_MemberIdAndIsLove(MemberChallenge memberChallenge, Long memberId,
		Boolean isLove);

	Optional<Love> findByMemberChallengeAndMember(MemberChallenge memberChallenge, Member member);

	Optional<Love> findByMemberChallengeAndMemberAndIsLove(MemberChallenge memberChallenge, Member member,
		Boolean isLove);

	List<Love> findAllByMemberChallenge_MemberChallengeIdAndIsLove(Long memberChallengeId, Boolean isLove);
}
