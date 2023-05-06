package com.example.shadowingservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.ShadowingVideoInterest;

public interface ShadowingVideoInterestRepository extends JpaRepository<ShadowingVideoInterest, Long> {

	List<ShadowingVideoInterest> findByInterest_InterestId(Long interestId);

}
