package com.example.memberservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.memberservice.entity.member.MemberInterest;

public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long>, MemberRepositoryCustom {
}
