package com.winepredictive.winepredictive.service;

import com.winepredictive.winepredictive.dto.SignupRequest;
import com.winepredictive.winepredictive.dto.UserDto;

public interface AuthService {
	
    UserDto createCustomer(SignupRequest signupRequest);
	
	boolean hasCustomerWithEmail(String email);
}
