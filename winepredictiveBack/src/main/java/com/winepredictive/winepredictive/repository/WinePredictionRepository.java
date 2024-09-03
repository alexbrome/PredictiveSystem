package com.winepredictive.winepredictive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winepredictive.winepredictive.entity.Wine;
import com.winepredictive.winepredictive.entity.WinePrediction;

@Repository
public interface WinePredictionRepository extends JpaRepository<WinePrediction, Long> {

	List<WinePrediction> findByIdWine_Id(Long idWine);
	
	
}
