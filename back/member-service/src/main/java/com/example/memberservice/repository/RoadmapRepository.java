package com.example.memberservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.member.Roadmap;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
	Optional<Roadmap> findByMember_MemberId(Long memberId);
}
