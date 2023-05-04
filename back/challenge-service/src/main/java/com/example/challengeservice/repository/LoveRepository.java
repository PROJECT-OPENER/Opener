package com.example.challengeservice.repository;

import com.example.challengeservice.entity.challenge.Love;
import com.example.challengeservice.entity.challenge.MemberChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LoveRepository extends JpaRepository<Love, Long> {
    int countByMemberChallenge(MemberChallenge memberChallenge);
}
