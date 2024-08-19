package com.winepredictive.winepredictive.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.winepredictive.winepredictive.dto.SignupRequest;
import com.winepredictive.winepredictive.dto.UserDto;
import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.enums.UserRole;
import com.winepredictive.winepredictive.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class AuthServiceImpl implements AuthService{

private final UserRepository userRepository;
	
	public AuthServiceImpl(UserRepository userRepository) {
	this.userRepository = userRepository;
}
	//Crete admin account
	@PostConstruct
	public void createAdminAccount() {
		Users adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
		if(adminAccount == null) {
			Users newAdminAccount = new Users();
			newAdminAccount.setName("Admin");
			newAdminAccount.setEmail("admin@gmail.com");
			newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("admin"));
			newAdminAccount.setUserRole(UserRole.ADMIN);
			userRepository.save(newAdminAccount);
		}
	}
    //Create customer/user
	public UserDto createCustomer(SignupRequest signupRequest) {
		Users user = new Users();
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		user.setUserRole(UserRole.CUSTOMER);
		Users createdUser = userRepository.save(user);
		UserDto userDto = new UserDto();
		userDto.setId(createdUser.getId());     
		return userDto;
	}

	//Check out if email exists
	@Override
	@Transactional
	public boolean hasCustomerWithEmail(String email) {	
		return userRepository.findFirstByEmail(email).isPresent();
	}
	
	
}
