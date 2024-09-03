package com.winepredictive.winepredictive.entity;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.winepredictive.winepredictive.enums.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;


@Entity
@Table( name = "users" )
public class Users implements UserDetails{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String email;
	@Size(min = 5, max = 80,message = "{password.size}")
	private String password;
	
	private UserRole userRole;
	
	@OneToMany(mappedBy = "idUser")
    private Set<Wine> wines;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	
		return List.of(new SimpleGrantedAuthority(userRole.name()));
	}

	@Override
	public String getUsername() {
		
		return this.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}
	
	//Setter getters constructor
	
	
	
	public Long getId() {
		return id;
	}
	 public Set<Wine> getWines() {
	        return wines;
	    }

	  public void setWines(final Set<Wine> wines) {
	        this.wines = wines;
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
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	
	
	public Users(Long id, String name, String email,
			@Size(min = 5, max = 80, message = "{password.size}") String password, UserRole userRole,
			Set<Wine> wines) {
		
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.userRole = userRole;
		this.wines = wines;
	}

	public Users() {
	
	}


	
	
	
	
	
}
