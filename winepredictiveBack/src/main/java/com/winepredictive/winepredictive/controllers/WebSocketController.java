package com.winepredictive.winepredictive.controllers;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestClient;
import com.winepredictive.winepredictive.dto.ChatMessage;
import com.winepredictive.winepredictive.entity.GeminiModel;
import com.winepredictive.winepredictive.entity.ModelListResponse;


@Controller
@CrossOrigin("*")
public class WebSocketController {
	
	private final ChatClient chatClient;
	
	//Endpoint for chating with AI
    public WebSocketController(RestClient.Builder builder, ChatClient.Builder builderr) {
    	this.chatClient= builderr.build();
        log.info("GeminiModelController...");
        this.restClient = builder
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }
	
	private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);
	
    @Value("${spring.ai.openai.api-key}")
    private String GEMINI_API_KEY;
    
    private final RestClient restClient;

    
   @GetMapping("/models")
    public List<GeminiModel> models(){
    	 
    	ResponseEntity<ModelListResponse> response = restClient.get()
    			.uri("/v1beta/openai/models")
    			.header("Authorization","Bearer " + GEMINI_API_KEY)
    			.retrieve()
    			.toEntity(ModelListResponse.class);
    	return response.getBody().data();
      
    }
	
   //Endpoint to chat AI
   @MessageMapping("/chat/{roomId}")
   @SendTo("/topic/{roomId}")
   public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message) {
	    System.out.println("Mensaje recibido: " + message.getMessage());
	    try {
	        String response = chatClient.prompt(message.getMessage())
	                .call()
	                .content();

	        System.out.println("Respuesta generada: " + response);

	        return new ChatMessage(response, "AI");

	    } catch (Exception e) {
	        System.out.println("Error al procesar el mensaje: " + e.getMessage());
	        return new ChatMessage("Error: " + e.getMessage(), "System");
	    }
   }
   
   
   
   
   /*
	public WebSocketController(ChatClient.Builder chatClient) {
		this.chatClient = chatClient.build();
	}*/
   /*
	@MessageMapping("/chat/{roomId}")
	@SendTo("/topic/{roomId}")
	public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message) {
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
	}*/

	    
	 }
   
   
   
   
   
   

