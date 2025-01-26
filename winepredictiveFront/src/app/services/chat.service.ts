import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

 stompClient:any;
messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  constructor() {
    this.initConnectionSocket();
    //this.messageSubject.next([{ user: 'TestUser', message: 'Mensaje inicial' }]);
   }


initConnectionSocket() {
  const url = '//localhost:8081/chat-socket'; // URL del socket backend
  const socket = new SockJS(url);

  // Crear una instancia del cliente STOMP
  this.stompClient = new Client({
    webSocketFactory: () => socket as WebSocket, // Usar SockJS como transporte
    debug: (msg: any) => console.log('STOMP debug: ', msg), // Habilitar logs para debug
    reconnectDelay: 5000, // Intentar reconectar cada 5 segundos si falla
  });

  // Configurar eventos de conexión y error
  this.stompClient.onConnect = () => {
    console.log('Conexión STOMP establecida');
    // Aquí puedes suscribirte a temas específicos si es necesario
  };

  this.stompClient.onStompError = (frame: { headers: { [x: string]: any; }; body: any; }) => {
    console.error('Error STOMP:', frame.headers['message']);
    console.error('Detalles:', frame.body);
  };

  // Activar la conexión
  this.stompClient.activate();
}



joinRoom(roomId: string) {
  if (this.stompClient && this.stompClient.connected) {
    console.log(`Suscribiéndose a la sala: /topic/${roomId}`);
    this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
      const messageContent: ChatMessage = JSON.parse(message.body);
      console.log("Mensaje recibido desde el servidor: ", messageContent);

      // Actualiza el BehaviorSubject acumulando mensajes
      const currentMessages = this.messageSubject.value || [];
      this.messageSubject.next([...currentMessages, messageContent]);
    });
  } else {
    console.error("STOMP client no está conectado.");
  }
}




//METHOD TO SEND MESSAGE
sendMessage(roomId: string, chatMessage: ChatMessage) {
  console.log("Enviando mensaje del servicio");
  
  if (this.stompClient && this.stompClient.connected) {
    this.stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(chatMessage)
    });
  } else {
    console.error('STOMP client is not connected');
  }
  console.log(chatMessage);
}


//METHOD TO DEVOLVER EL MENSAJE
getMessageSubject(){
  return this.messageSubject.asObservable();
}

subscribeToRoom(roomId: string) {
  if (this.stompClient && this.stompClient.connected) {
    this.stompClient.subscribe(`/topic/${roomId}`, (message: { body: string }) => {
      const receivedMessage = JSON.parse(message.body);
      console.log("Mensaje recibido desde el servidor: ", receivedMessage);

      const currentMessages = this.messageSubject.value || [];
      this.messageSubject.next([...currentMessages, receivedMessage]);
    });
  } else {
    console.error("STOMP client no está conectado. Reintenta la suscripción.");
  }
}




}
