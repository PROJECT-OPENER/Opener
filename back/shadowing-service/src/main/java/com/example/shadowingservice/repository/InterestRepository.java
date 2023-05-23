package com.example.shadowingservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.shadowing.Interest;

public interface InterestRepository extends JpaRepository<Interest, Long> {
	Optional<Interest> findByInterest(String category);

	Optional<Interest> findByInterestId(Long interestId);
}
