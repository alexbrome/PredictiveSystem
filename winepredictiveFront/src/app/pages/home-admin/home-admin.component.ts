import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WineService } from '../../services/wine.service';
import { CommonModule, NgFor } from '@angular/common';
import { WinePredictionsService } from '../../services/wine-predictions.service';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Rating, RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    NgFor,CommonModule,
    ButtonModule,RatingModule,FormsModule,DialogModule
  ],
  providers:[DatePipe],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})

export class HomeAdminComponent implements OnInit {

  //Variables
  users: any[] = [];
  wines: any[] = [];
  predictions: any[] = [];
  selectedWine: any = null;
  selectedUser: any = null;
  predictionsIsEmpty:Boolean = false;
  dialogIsVisible:boolean = false;
  selectedPrediction :any = {};

  //Constructor
  constructor(private userService: UserService,private wineService:WineService
   ,private predictionService:WinePredictionsService,private datePipe: DatePipe,
   private winePredictionService:WinePredictionsService
  ) {

  }


  ngOnInit(): void {
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
          this.users = data;      
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
  }
  
  selectWine(wine: any): void {
    this.selectedWine = wine;
    this.loadPredictionsByWineId(wine.id);
  }

  deleteWinePredictionById(id: number): void {
    this.winePredictionService.deleteWinePredictionById(id).subscribe({
      next: () => {
        // Eliminar la predicción de la lista localmente
        this.predictions = this.predictions.filter(prediction => prediction.id !== id);
        alert('Prediction deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting prediction', err);
        alert('Error deleting prediction');
      }
    });
  }

  showDialogInfo(prediction: any): void {
    this.selectedPrediction = prediction;
    this.dialogIsVisible = true;
  }
}

