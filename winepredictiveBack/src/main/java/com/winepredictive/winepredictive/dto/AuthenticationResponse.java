package com.winepredictive.winepredictive.dto;

import com.winepredictive.winepredictive.enums.UserRole;

public class AuthenticationResponse {

private String jwt;
	
	private UserRole userRole;
	
	private Long userId;

	//constructor
	public AuthenticationResponse(String jwt, UserRole userRole, Long userId) {
		super();
		this.jwt = jwt;
		this.userRole = userRole;
		this.userId = userId;
	}

	
	
	
	public AuthenticationResponse() {
		super();
	}




	//getters and setters
	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
	
	
	
	
	
}
