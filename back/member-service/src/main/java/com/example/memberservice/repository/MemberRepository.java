package com.example.memberservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);

	Optional<Member> findByEmail(String email);

	Optional<Member> findByNickname(String nickname);
}
