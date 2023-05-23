package com.example.memberservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.member.Member;
import com.example.memberservice.entity.member.MemberInterest;

@Repository
public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long> {
	List<MemberInterest> findAllByMember(Member member);
}
