package com.example.memberservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.MemberInterest;

public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long>, MemberRepositoryCustom {
	List<MemberInterest> findAllByMember(Member member);
}
