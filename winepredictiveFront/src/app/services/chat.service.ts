import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

 stompClient:any;
messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

// Nuevo: controlar salas pendientes y ya suscritas para evitar duplicados
private pendingRoomId: string | null = null;
private subscribedRooms: Set<string> = new Set();

  constructor() {
    this.initConnectionSocket();
   }

initConnectionSocket() {
  /*
 const url= '//localhost:8081/chat-socket';*///URL del socket backend
 const url= environment.apiBaseUrl.replace('http','ws') + '/chat-socket';
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
    // Si había una sala pendiente, suscribirse ahora (una sola vez)
    if (this.pendingRoomId) {
      this._doSubscribe(this.pendingRoomId);
    }
  };

  this.stompClient.onStompError = (frame: { headers: { [x: string]: any; }; body: any; }) => {
    console.error('Error STOMP:', frame.headers['message']);
    console.error('Detalles:', frame.body);
  };

  // Activar la conexión
  this.stompClient.activate();
}


// Método interno para suscribirse solo una vez
private _doSubscribe(roomId: string) {
  if (!this.stompClient) {
    console.error('STOMP client not initialized');
    return;
  }
  if (this.subscribedRooms.has(roomId)) {
    console.log(`Ya suscrito a /topic/${roomId}`);
    return;
  }

  console.log(`Suscribiéndose a la sala: /topic/${roomId}`);
  this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
    const messageContent: ChatMessage = JSON.parse(message.body);
    console.log("Mensaje recibido desde el servidor: ", messageContent);

    // Actualiza el BehaviorSubject acumulando mensajes
    const currentMessages = this.messageSubject.value || [];
    this.messageSubject.next([...currentMessages, messageContent]);
  });

  this.subscribedRooms.add(roomId);
}

joinRoom(roomId: string) {
  this.pendingRoomId = roomId;
  if (this.stompClient && this.stompClient.connected) {
    this._doSubscribe(roomId);
  } else {
    console.log(`Sala ${roomId} marcada como pendiente hasta conexión STOMP`);
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

// Eliminar duplicación de subscribeToRoom: usar joinRoom/_doSubscribe
subscribeToRoom(roomId: string) {
  // Mantener compatibilidad: redirige a joinRoom
  this.joinRoom(roomId);
}

}
