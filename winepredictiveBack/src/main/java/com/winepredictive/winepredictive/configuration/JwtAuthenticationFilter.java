package com.winepredictive.winepredictive.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.winepredictive.winepredictive.service.UserService;
import com.winepredictive.winepredictive.utils.JWTUtil;

import com.mysql.cj.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private  JWTUtil jwtUtil;
	
	@Autowired
	private UserService userService;
	
	
	
	public JwtAuthenticationFilter(JWTUtil jwtUtil, UserService userService) {
		
		this.jwtUtil = jwtUtil;
		this.userService = userService;
	}



	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		final String authHeader=request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		if(StringUtils.isEmptyOrWhitespaceOnly(authHeader) || StringUtils.startsWithIgnoreCase(authHeader,"Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwt = authHeader.substring(7);
		userEmail = jwtUtil.extractUserName(jwt);
		if(StringUtils.isNullOrEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
		UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
			if(jwtUtil.isTokenValid(jwt, userDetails)) {
				SecurityContext context = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				context.setAuthentication(authToken);
				SecurityContextHolder.setContext(context);
			}
		}
	}
	}
