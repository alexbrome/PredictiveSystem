package com.winepredictive.winepredictive.controllers;
import java.util.HashMap;
import java.util.Map;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/v1/llm", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class LLMRestController {
	private final ChatClient chatClient;
	
	public LLMRestController(ChatClient.Builder chatClient) {
		this.chatClient = chatClient.build();
	}
	
	@GetMapping("")
	public ResponseEntity<Object> chat(@RequestParam String query) {
		String response = chatClient.prompt()
				.user(query)
				.call()
				.content();
             System.out.println(response);
		
	    try {
	    
	        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("{\"response\": \"" + response + "\"}");
	       
	    } catch (Exception e) {
	        // Devuelve un error 500 con un JSON válido
	        Map<String, String> error = new HashMap<>();
	        error.put("error", "Error al procesar la solicitud: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	    }
	}


	
}
