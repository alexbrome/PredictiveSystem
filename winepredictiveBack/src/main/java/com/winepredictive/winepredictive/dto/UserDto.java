package com.winepredictive.winepredictive.dto;

import com.winepredictive.winepredictive.enums.UserRole;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserDto {

	 private Long id;

	    @NotNull
	    @Size(max = 255)
	    private String name;

	    @NotNull
	    @Size(max = 255)
	    private String email;

	    @NotNull
	    @Size(max = 255)
	    private String password;

	    private UserRole userRole;

	// Constructor
	public UserDto(Long id, String name, String email, UserRole userRole) {

		this.id = id;
		this.name = name;
		this.email = email;
		this.userRole = userRole;
	}

	public UserDto() {

	}

	// Setter and getters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
