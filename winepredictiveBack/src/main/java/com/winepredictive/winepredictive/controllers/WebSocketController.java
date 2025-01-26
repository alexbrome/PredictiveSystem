package com.winepredictive.winepredictive.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.winepredictive.winepredictive.dto.ChatMessage;

@Controller
@CrossOrigin("*")
public class WebSocketController {
	private final ChatClient chatClient;
	
	public WebSocketController(ChatClient.Builder chatClient) {
		this.chatClient = chatClient.build();
	}

	@MessageMapping("/chat/{roomId}")
	@SendTo("/topic/{roomId}")
	public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message) {
	    System.out.println("Entra en el método con roomId: " + roomId);
	    System.out.println("Mensaje recibido: " + message.getMessage());
	    try {
	        String response = chatClient.prompt()
	                .user(message.getMessage())
	                .call()
	                .content();

	        System.out.println("Respuesta generada: " + response);

	        // Devuelve el mensaje al cliente suscrito
	        ChatMessage chatResponse = new ChatMessage(response, "AI");
	        System.out.println("Enviando mensaje procesado al canal: " + chatResponse);
	        return chatResponse;
	    } catch (Exception e) {
	        System.out.println("Error al procesar el mensaje: " + e.getMessage());
	        return new ChatMessage("Error: " + e.getMessage(), "System");
	    }
	}


	

	
	
	
}
