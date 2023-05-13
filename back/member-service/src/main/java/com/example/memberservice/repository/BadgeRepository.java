package com.example.memberservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.memberservice.entity.member.Badge;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
	Optional<Badge> findByMember_MemberId(Long memberId);
}
