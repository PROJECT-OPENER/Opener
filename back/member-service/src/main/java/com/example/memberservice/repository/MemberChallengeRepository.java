package com.example.memberservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.challenge.MemberChallenge;

@Repository
public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {
	Page<MemberChallenge> findByMember_MemberIdAndIsDeleteOrderByCreateDateDesc(Long memberId, Boolean isDelete, Pageable pageable);

	@Query("SELECT mc FROM MemberChallenge mc INNER JOIN Love l ON mc.memberChallengeId = l.memberChallenge.memberChallengeId WHERE l.member.memberId = :memberId and mc.isDelete = false and l.isLove = true ORDER BY mc.createDate DESC")
	Page<MemberChallenge> findByLovedMemberIdOrderByCreateDateDesc(@Param("memberId") Long memberId, Pageable pageable);
}
