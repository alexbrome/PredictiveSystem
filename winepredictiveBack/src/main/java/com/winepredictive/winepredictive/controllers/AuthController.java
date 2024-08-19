package com.winepredictive.winepredictive.controllers;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.winepredictive.winepredictive.dto.AuthenticationRequest;
import com.winepredictive.winepredictive.dto.AuthenticationResponse;
import com.winepredictive.winepredictive.dto.SignupRequest;
import com.winepredictive.winepredictive.dto.UserDto;
import com.winepredictive.winepredictive.entity.Users;
import com.winepredictive.winepredictive.repository.UserRepository;
import com.winepredictive.winepredictive.service.AuthService;
import com.winepredictive.winepredictive.service.UserService;
import com.winepredictive.winepredictive.utils.JWTUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	private final AuthService authService;

	private final AuthenticationManager authenticationManager;

	private final UserService userService;

	private final JWTUtil jwtUtil;

	private final UserRepository userRepository;

//Constructor
	public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserService userService,
			JWTUtil jwtUtil, UserRepository userRepository) {
		this.authService = authService;
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.jwtUtil = jwtUtil;
		this.userRepository = userRepository;
	}

	// Method to save users ( non admin )
	@PostMapping("/signup")
	public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
		System.out.println("ha entrado en el signup, objeto entrante :" + signupRequest);
		System.out.println(
				"Datos del objeto en el signup: " + signupRequest.getEmail() + ", " + signupRequest.getPassword());
		// if mail allready exists
		if (authService.hasCustomerWithEmail(signupRequest.getEmail())) {

			return new ResponseEntity<>("Customer already exists with this email", HttpStatus.NOT_ACCEPTABLE);
		}
		UserDto createdCustomerDto = authService.createCustomer(signupRequest);

		// if user is null ( leak some fields )
		if (createdCustomerDto == null) {
			return new ResponseEntity<>("Customer not created, some fields errors", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(createdCustomerDto, HttpStatus.CREATED);
	}

	// Method to manage login
	@PostMapping("/login")
	public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws BadCredentialsException, DisabledException, UsernameNotFoundException {
		System.out.println(" ha entrado en el metodo del login :"+authenticationRequest);
		
		try {
			System.out.println("Ha entrado en el try");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
					authenticationRequest.getPassword()));
			System.out.println("Autenticacion exitosa");

		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("Nombre de ususario o password incorrecto");
		}
		final UserDetails userDetails = userService.userDetailsService()
				.loadUserByUsername(authenticationRequest.getEmail());
		Optional<Users> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);
		AuthenticationResponse authenticationResponse = new AuthenticationResponse();
		if (optionalUser.isPresent()) {
			authenticationResponse.setJwt(jwt);
			authenticationResponse.setUserId(optionalUser.get().getId());
			authenticationResponse.setUserRole(optionalUser.get().getUserRole());
		}
		System.out.println("imprimiendo el authenticationResponse: " + authenticationResponse);
		return authenticationResponse;
	}

}
