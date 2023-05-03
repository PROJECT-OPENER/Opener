package com.example.challengeservice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.challengeservice.entity.challenge.Challenge;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	List<Challenge> findAll();
}
