package com.winepredictive.winepredictive.configuration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.winepredictive.winepredictive.service.UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfiguration {

    

    public WebSecurityConfiguration(JwtAuthenticationFilter jwtauthenticationFilter, UserService userService) {
        this.jwtauthenticationFilter = jwtauthenticationFilter;
        this.userService = userService;
    }

private final JwtAuthenticationFilter jwtauthenticationFilter;
	
	private final UserService userService;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
		http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(request->
		         request
				.requestMatchers("/api/admin/**").permitAll()//hasAnyAuthority(UserRole.ADMIN.name())
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers("/api/customer/**").permitAll()
				.requestMatchers("/api/mensaje/**").permitAll()
				.requestMatchers("/api/member").permitAll()//.hasAnyAuthority(UserRole.CUSTOMER.name())
				.anyRequest().authenticated())
		.sessionManagement(manager->
		manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authenticationProvider(authenticationProvider())
		.addFilterBefore(jwtauthenticationFilter, UsernamePasswordAuthenticationFilter.class);
				
	return http.build();
	}


	
   @Bean
    public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


   
    @Bean
    public AuthenticationProvider authenticationProvider() {
    	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    	authProvider.setUserDetailsService(userService.userDetailsService());
    	authProvider.setPasswordEncoder(passwordEncoder());
    	return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationMaager(AuthenticationConfiguration config)throws Exception{
    	return config.getAuthenticationManager();
    }
  
}
