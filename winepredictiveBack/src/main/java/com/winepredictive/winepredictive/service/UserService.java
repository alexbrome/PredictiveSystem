package com.winepredictive.winepredictive.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

  UserDetailsService userDetailsService();
	
	String getEmailByUserId(Long id);
	
}
