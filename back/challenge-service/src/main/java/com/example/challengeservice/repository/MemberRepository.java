package com.example.challengeservice.repository;

import com.example.challengeservice.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long memberId);

    Optional<Member> findByNickname(String nickname);
}
