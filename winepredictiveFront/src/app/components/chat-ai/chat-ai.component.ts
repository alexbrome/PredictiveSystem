import { AfterViewChecked, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


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
    ListboxModule,ToastModule
  ],
  providers: [MessageService],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
  
})
export class ChatAIComponent implements OnInit, AfterViewChecked{

 @ViewChild('chatWindow') chatWindow!: ElementRef;

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

private messageSubscribed = false; // evitar múltiples suscripciones al BehaviorSubject

constructor(private chatService:ChatService,
  private route:ActivatedRoute,
  private winePredictionService: WinePredictionsService,
  private messageService:MessageService,
  private ngZone: NgZone
){

}

ngOnInit(): void {
  /*Properties for properties list*/
  this.filteredItems = ["FixedAcidity", "VolatileAcidity", "CitricAcid", "ResidualSugar", "Chlorides", "FreeSulfurDioxide", "TotalSulfurDioxide", "Density", "pH", "Sulphates", "Alcohol"];
  
  // Suscribirse UNA vez al subject que emite mensajes del backend
  this.listenerMessage();

  // Solicitar al servicio unirse a la sala (el servicio se encargará de subscribirse cuando haya conexión)
  this.chatService.joinRoom("ABC"); 
  
  this.userId = this.route.snapshot.params["userId"];

  //Route paramMap to get the predictionId from the URL
  this.route.paramMap.subscribe(params => {
    this.predictionId = params.get('predictionId') || '';
    this.getPredictionByIdPrediction(+this.predictionId);
  });
  
}

// Scroll to bottom of chat window
ngAfterViewChecked(): void {
  this.scrollToBottom();
}

// Scroll to the bottom of the chat window
scrollToBottom(): void {
    if (this.chatWindow) {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }
  }



//Send message IA
sendMessage() {

  
  const chatMessage = {
    message: this.messageInput,
    user: "user", // Indica que este mensaje es del usuario
  } as ChatMessage;
  
// Send meesage to backend
  this.chatService.sendMessage("ABC", chatMessage);

  // Añadimos el mensaje del usuario a la lista combinada
  this.messageListAllMessages.push(chatMessage);
  this.messageInput = '';
  console.log('Lista de mensajes actualizada:', this.messageListAllMessages);
}

//Recieve message IA
listenerMessage() {
  if (this.messageSubscribed) return;
  this.messageSubscribed = true;

  this.chatService.getMessageSubject().subscribe((messages: any[]) => {
    console.log("Mensajes recibidos del backend: ", messages);
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      const formattedMessage = {
        message: lastMessage.message,
        user: "IA"
      };

      // Ejecutar mutaciones del array dentro de NgZone para forzar detección de cambios
      this.ngZone.run(() => {
        // Remover el mensaje temporal si existe
        const tempIndex = this.messageListAllMessages.findIndex(
          msg => msg.user === "IA" && msg.message === "I am working on your response..."
        );
        if (tempIndex !== -1) {
          this.messageListAllMessages.splice(tempIndex, 1);
        }

        // Añadir el mensaje real de la IA a la lista
        this.messageListAllMessages.push(formattedMessage);
      });

      console.log('Mensaje recibido de la IA:', formattedMessage.message);
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
  // If not selected property, show error message
  if (!selectedProperty || selectedProperty.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Error',
      detail: 'Selecting a property is mandatory'
    });
    return;
  }

  // Construir el mensaje dinámicamente con las características del vino, excluyendo algunas claves
  const wineDetails = this.predictionList.length > 0
    ? Object.entries(this.predictionList[0])
        .filter(([key, _]) => !['id', 'idWine', 'dateCreated'].includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    : 'No wine details available';

  const chatMessage = {
    message: `How could I improve the ${selectedProperty} of a wine with the following values? ${wineDetails}`,
    user: "user"
  } as ChatMessage;

  // Enviar el mensaje al backend
  this.chatService.sendMessage("ABC", chatMessage);

  // Añadir el mensaje del usuario a la lista
  this.messageListAllMessages.push(chatMessage);
  console.log('Mensaje enviado a la IA:', chatMessage.message);

  // Agregar mensaje temporal de la IA mientras se espera la respuesta
  const tempMessage: ChatMessage = {
    message: "I am working on your response...",
    user: "IA"
  };
  this.messageListAllMessages.push(tempMessage);
}






}