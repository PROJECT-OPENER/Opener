package com.example.shadowingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.member.Roadmap;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
	Roadmap findByMember_MemberId(Long memberId);
}
