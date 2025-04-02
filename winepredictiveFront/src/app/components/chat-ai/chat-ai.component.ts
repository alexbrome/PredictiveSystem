import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../models/chat-message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { WinePredictionsService } from '../../services/wine-predictions.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-chat-ai',
  standalone: true,
  imports: [FormsModule,CommonModule,
    ButtonModule,AutoCompleteModule,TableModule,
    TooltipModule,DropdownModule,
    ListboxModule
  ],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
  
})
export class ChatAIComponent implements OnInit{

messageInput:string = "";
userId:string = "";
predictionId:string = "";
prediction:any;
predictionList:any[] = [];

messageListUser:any[] = [];
messageListIA:any[] = [];
messageListAllMessages:any[] = [];
selectedProperty = '';
filteredItems:any[] = [];

constructor(private chatService:ChatService,
  private route:ActivatedRoute,
  private winePredictionService: WinePredictionsService,
){

}

ngOnInit(): void {
  /*Properties for properties list*/
 this.filteredItems = ["FixedAcidity", "VolatileAcidity", "CitricAcid", "ResidualSugar", "Chlorides", "FreeSulfurDioxide", "TotalSulfurDioxide", "Density", "pH", "Sulphates", "Alcohol"];
 
  this.chatService.joinRoom("ABC"); // se une a una sala llamada ABC
  this.userId = this.route.snapshot.params["userId"];
  // Primero, esperamos que el cliente se haya conectado para suscribirnos
  this.chatService.stompClient.onConnect = () => {
    this.listenerMessage();  // Después de la conexión, escuchamos los mensajes
    this.chatService.subscribeToRoom("ABC");
  };
  this.route.paramMap.subscribe(params => {
    this.predictionId = params.get('predictionId') || '';
  });
this.getPredictionByIdPrediction(+this.predictionId);
 
}

//Send message IA
sendMessage() {
  const chatMessage = {
    message: this.messageInput,
    user: "user", // Indica que este mensaje es del usuario
  } as ChatMessage;

  console.log("Llega al componente");

  this.chatService.sendMessage("ABC", chatMessage);

  // Añadimos el mensaje del usuario a la lista combinada
  this.messageListAllMessages.push(chatMessage);
  this.messageInput = '';
  console.log('Lista de mensajes actualizada:', this.messageListAllMessages);
}

//Recieve message IA
listenerMessage() {
  this.chatService.getMessageSubject().subscribe((messages: any[]) => {
    console.log("Mensajes recibidos del backend: ", messages);

    // Obtenemos el último mensaje del array recibido
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      const formattedMessage = {
        message: lastMessage.message,
        user: "IA", // Indica que este mensaje es de la IA
      };

      // Añadimos el último mensaje de la IA a la lista combinada
      this.messageListAllMessages.push(formattedMessage);
      console.log('Lista de mensajes combinada actualizada:', this.messageListAllMessages);
    }
  });
}



getPredictionByIdPrediction(idPrediction: number) {
  this.winePredictionService.getPredictionByIdPrediction(idPrediction).subscribe({
    next: (res) => {
     
      this.predictionList = [res]; // Asegura que la tabla recibe un array
      console.log("Respuesta completa desde el backend:", JSON.stringify(res, null, 2));
      console.log("PredictionList para la tabla:", this.predictionList);
    },
    error: (err) => {
      console.error('Error al obtener la predicción:', err);
    }
  });
}
askAI(selectedProperty: string) {
  // Construir el mensaje dinámicamente con las características del vino, excluyendo 'id', 'idWine' y 'dateCreated.idWine'
  const wineDetails = this.predictionList.length > 0
    ? Object.entries(this.predictionList[0])
        .filter(([key, _]) => !['id', 'idWine', 'dateCreated'].includes(key)) // Excluir claves específicas
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    : 'No wine details available';

  const chatMessage = {
    message: `How could I improve the ${selectedProperty} of a wine with the following values? ${wineDetails}`,
    user: "user", // Indica que este mensaje es del usuario
  } as ChatMessage;

  // Enviar el mensaje al backend
  this.chatService.sendMessage("ABC", chatMessage);

  // Añadir el mensaje a la lista de mensajes
  this.messageListAllMessages.push(chatMessage);
  console.log('Mensaje enviado a la IA:', chatMessage.message);

  // Escuchar la respuesta de la IA
  
}





}