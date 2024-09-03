import { Component, OnInit } from '@angular/core';
import { WinePredictionsService } from '../../services/wine-predictions.service';
import { WinePrediction } from '../../models/winePrediction';
import { WineService } from '../../services/wine.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../auth/services/storage.service';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-summary-white-wine',
  standalone: true,
  imports: [
    ListboxModule,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule

  ],
  providers: [],
  templateUrl: './summary-white-wine.component.html',
  styleUrl: './summary-white-wine.component.css'
})
export class SummaryWhiteWineComponent implements OnInit{
  
  idUser:any = +StorageService.getUserId();
  winePrectionsList!:any[]; // Predictions Array
  wines!: any[];  // Wines Array 
  selectedWine:any = [];
  selectedPredictions:any[] = [];
  
  
  constructor(private winePredictionService:WinePredictionsService,
    private wineService:WineService,
  ){
    
  }
  
  ngOnInit(): void {
    this.getWinesByUerId();
    this.getAllPredictions();
  }
  
  getWinesByUerId(){
    this.wineService.getAllWinesByUserId(this.idUser).subscribe(
      (data) => {
        this.wines = data;
        console.log('Wines for user desde la clase recien llamado el servicio:', this.wines);
      },
      (error) => {
        console.error('Error fetching wines:', error);
      }
    );
  }
  
  getAllPredictions(){
    this.winePredictionService.getAllPredictions().subscribe(
      (response: WinePrediction[]) => {
        this.winePrectionsList = response;
        console.log('Predicciones del back :', response);  // Verifica la respuesta
        if (response) {
          this.winePrectionsList = response;
        } 
      },
      (error) => {
        console.error('Error al obtener las predicciones:', error);  // Maneja errores
      }
    );
  }
  
  updateSelectedPredictions(): void {
    if (this.selectedWine && this.winePrectionsList.length > 0) {
      this.selectedPredictions = this.winePrectionsList.filter(
        prediction => prediction.idWine === this.selectedWine.id
      );
      console.log('Selected Predictions updated:', this.selectedPredictions);
    }
  }
  
  onWineSelect(selectedWine: any): void {
    this.selectedWine = selectedWine;
    this.updateSelectedPredictions(); // Actualiza las predicciones al seleccionar un vino
    
    
  }
  
  deleteTable() {
    this.selectedWine = null; // Deseleccionar el vino seleccionado
    this.selectedPredictions = []; // Vaciar las predicciones seleccionadas
    console.log('Tabla limpiada, vino deseleccionado y predicciones eliminadas.');
  }
  
  /*getPredictionsByIdWine(idWine: number) {
    
  this.winePredictionService.getPredictionsByIdWine(idWine).subscribe(
      (response: WinePrediction[]) => {
        this.winePrectionsList = response;
        console.log('La respuesta desde el ts del componente:', response);  // Verifica la respuesta
        if (response) {
          this.winePrectionsList = response;
        } else {
          console.warn('Respuesta es null o undefined');
        }
      },
      (error) => {
        console.error('Error al obtener las predicciones:', error);  // Maneja errores
      }
    );
  }
*/
   




}
