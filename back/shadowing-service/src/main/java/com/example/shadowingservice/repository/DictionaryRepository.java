package com.example.shadowingservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.shadowing.Dictionary;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {

	Optional<Dictionary> findByWord(String word);

}
