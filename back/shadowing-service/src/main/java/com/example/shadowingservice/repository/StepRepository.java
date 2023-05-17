package com.example.shadowingservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.shadowingservice.entity.shadowing.Step;

public interface StepRepository extends JpaRepository<Step, Long> {

	Step findByStepId(Long stepId);

	@Query("SELECT DISTINCT s.stepNo FROM Step s")
	List<Integer> findDistinctStepNo();

	@Query("SELECT DISTINCT s.stepTheme FROM Step s WHERE s.stepNo = :stepNo")
	List<Integer> findDistinctStepTheme(@Param("stepNo") int stepNo);

	@Query("SELECT s.stepId FROM Step s WHERE s.stepNo = :stepNo AND s.stepTheme = :stepTheme")
	List<Long> findStepIdList(@Param("stepNo") int stepNo, @Param("stepTheme") int stepTheme);

	@Query("SELECT COUNT(s) FROM Step s WHERE s.stepNo = :stepNo AND s.stepTheme = :stepTheme")
	int getSentenceCount(@Param("stepNo") int stepNo, @Param("stepTheme") int stepTheme);

	@Query("SELECT COUNT(DISTINCT s.stepTheme) FROM Step s WHERE s.stepNo = :stepNo")
	int getThemeCount(@Param("stepNo") int stepNo);

}
