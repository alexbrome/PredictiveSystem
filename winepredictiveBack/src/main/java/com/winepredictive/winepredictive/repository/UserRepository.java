package com.winepredictive.winepredictive.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<Users, Long>{

	Optional<Users> findFirstByEmail(String email);

	Users findByUserRole(UserRole admin);
	
	
}
