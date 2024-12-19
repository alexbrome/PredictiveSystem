package com.winepredictive.winepredictive;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.winepredictive.winepredictive.repository")
public class WinepredictiveApplication {

	public static void main(String[] args) {
		SpringApplication.run(WinepredictiveApplication.class, args);
		
	}

}
