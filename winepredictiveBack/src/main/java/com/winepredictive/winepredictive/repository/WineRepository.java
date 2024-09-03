package com.winepredictive.winepredictive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.entity.Wine;

@Repository
public interface WineRepository extends JpaRepository<Wine, Long>{

	Wine findFirstByIdUser(Users users);

    boolean existsByNameIgnoreCase(String name);
	
}
