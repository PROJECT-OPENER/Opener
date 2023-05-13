package com.example.memberservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.memberservice.entity.shadowing.Interest;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
}
