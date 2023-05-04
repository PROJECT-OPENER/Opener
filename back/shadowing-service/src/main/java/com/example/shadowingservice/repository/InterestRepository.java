package com.example.shadowingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.Interest;

public interface InterestRepository extends JpaRepository<Interest, Long> {
	Interest getByInterest(String category);
}
