package com.example.chattingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chattingservice.entity.Keyword;

public interface KeywordRepository extends JpaRepository<Keyword, Long>, KeywordRepositoryCustom {
}
