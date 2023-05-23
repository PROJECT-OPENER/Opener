package com.example.shadowingservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.member.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findById(Long memberId);

}
