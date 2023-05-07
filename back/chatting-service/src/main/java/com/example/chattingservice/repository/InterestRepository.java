package com.example.chattingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chattingservice.entity.Interest;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
}
