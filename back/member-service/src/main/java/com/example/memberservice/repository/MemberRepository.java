package com.example.memberservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);

	Optional<Member> findByEmail(String email);

	Optional<Member> findByNickname(String nickname);

	@Query("SELECT COUNT(m) FROM Member m WHERE m.score > :score")
	Long countMembersWithScoreGreaterThan(@Param("score") int score);
}
