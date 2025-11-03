import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WineService } from '../../services/wine.service';
import { CommonModule, NgFor } from '@angular/common';
import { WinePredictionsService } from '../../services/wine-predictions.service';
import {  DatePipe } from '@angular/common';
import {  RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {  DialogModule } from 'primeng/dialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {  RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';




@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    NgFor,CommonModule,
    ButtonModule,RatingModule,FormsModule,DialogModule,
    ConfirmDialogModule,
    ToastModule,RouterModule,
    TableModule
  ],
 
  providers:[DatePipe,ConfirmationService,MessageService],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})

export class HomeAdminComponent implements OnInit {
items: any;
save() {
console.log(34);

}

  //Variables
  users: any[] = [];
  wines: any[] = [];
  predictions: any[] = [];
  selectedWine: any = null;
  selectedUser: any = null;
  predictionsIsEmpty:Boolean = false;
  dialogIsVisible:boolean = false;
  selectedPrediction :any = {};
  /*For SpeedDial*/
 


  //Constructor
  constructor(private userService: UserService,private wineService:WineService
   ,private predictionService:WinePredictionsService,private datePipe: DatePipe,
   private winePredictionService:WinePredictionsService,private confirmationService: ConfirmationService,
   private messageService: MessageService,
  ) {

  }


  ngOnInit(): void {
   
  /*Methods to load onInit*/ 
    this.loadAllUsers();
    this.predictions = this.predictions.map(prediction => {
      prediction.dateCreated = new Date(prediction.dateCreated);
      return prediction;
    });
   
    
  }


  //Methods
  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      {
        next: (data) => {
          this.users = data.filter((user: any) => user.name != 'Admin'); // Filtrar solo usuarios con rol 'USER'   
          console.log(this.users);
            
        },
        error: (err) => {
          console.log("Error al cargar los usuarios");
        }
      }
    )
  }

  loadWinesForUserId(userId: number): void {
    this.wineService.getAllWinesByUserId(userId).subscribe({
      next: (data) => {
        this.wines = data;
        if (this.wines.length === 0) {
          this.messageService.add({ severity: 'info', summary: 'No Wines Found', detail: 'This user has no wines.' });
        }
        
      },
      error: (err) => {
        console.error('Error loading wines:', err);
      }
    });
  }

  loadPredictionsByWineId(idWine: number): void {
    this.predictionService.getPredictionsByIdWine(idWine).subscribe({
      next: (data) => {
        this.predictions = data; // Almacena las predicciones
        this.predictionsIsEmpty = false; 
      },
      error: (err) => {
        console.error('Error loading predictions:', err);
        this.predictionsIsEmpty = true;
      }
    });
    
  }
  
  selectUser(user: any): void {
    this.selectedUser = user;
    this.loadWinesForUserId(user.id);
    this.predictions = []; // Limpiar predicciones al seleccionar un nuevo usuario
  }
  
  selectWine(wine: any): void {
    this.selectedWine = wine;
    this.loadPredictionsByWineId(wine.id);
  }

  deleteWinePredictionById(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this prediction?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.winePredictionService.deleteWinePredictionById(id).subscribe({
          next: () => {
            this.predictions = this.predictions.filter(prediction => prediction.id !== id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Prediction deleted successfully!' });
          },
          error: (err) => {
            console.error('Error deleting prediction', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete prediction.' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Deletion cancelled.' });
      }
    });
  }

  showDialogInfo(prediction: any): void {
    this.selectedPrediction = prediction;
    this.dialogIsVisible = true;
  }

  deleteUser(userId: any,event:MouseEvent): void {
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUserById(userId).subscribe({
          next: () => {
            // Eliminar el usuario de la lista en el frontend
            this.users = this.users.filter(user => user.id !== userId);
            // Mostrar mensaje de éxito
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User deleted successfully!'
            });
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            // Mostrar mensaje de error
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete user. Please try again.'
            });
          }
        });
      },
      reject: () => {
        // Mensaje si el usuario cancela la acción
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'User deletion cancelled.'
        });
      }
    });
  }
  
}

