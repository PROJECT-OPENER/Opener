package com.example.memberservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
	boolean existsByEmail(String email);

	boolean existsByNickname(String nickname);
}
