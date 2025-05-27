package com.winepredictive.winepredictive;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.winepredictive.winepredictive.repository")
public class WinepredictiveApplication {

	public static void main(String[] args) {
		SpringApplication.run(WinepredictiveApplication.class, args);
	}
//	@Bean
//	CommandLineRunner commandLineRunner(ChatClient .Builder builder) {
//		return args -> {
//		    var client = builder.build();
//			var response = client.prompt("Tell me an interesting fact about Google")
//					.call()
//					.content();
//
//			System.out.println(response);
//		};
//	}
}

