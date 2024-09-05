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
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-summary-white-wine',
  standalone: true,
  imports: [
    ListboxModule,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    ToggleButtonModule,
    ChartModule
  ],
  providers: [],
  templateUrl: './summary-white-wine.component.html',
  styleUrls: ['./summary-white-wine.component.css'] // Corregido styleUrls (plural)
})
export class SummaryWhiteWineComponent implements OnInit {
  idUser: any = +StorageService.getUserId();
  winePrectionsList!: any[]; // Predictions Array
  wines!: any[]; // Wines Array
  selectedWine: any = [];
  selectedPredictions: any[] = [];
  isChartVisible: boolean = false;
  selectedPredictionDates: string[] = [];

  // Chart
  options: any;
  data: any;
  predictionsDatesChart: any[] = [];
  qualityWineChart: any[] = [];

  constructor(private winePredictionService: WinePredictionsService, private wineService: WineService) {}

  ngOnInit(): void {
    this.getWinesByUerId();
    this.getAllPredictions();
    const documentStyle = getComputedStyle(document.documentElement);

    // Inicialización del gráfico vacío
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Quality',
          data: [],
          fill: true,
          borderColor: 'orange',
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: 'blue'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'grey'
          },
          grid: {
            color: 'white'
          }
        },
        y: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: 'white'
          }
        }
      }
    };
  }

  getWinesByUerId() {
    this.wineService.getAllWinesByUserId(this.idUser).subscribe(
      (data) => {
        this.wines = data;
      },
      (error) => {
        console.error('Error fetching wines:', error);
      }
    );
  }

  getAllPredictions() {
    this.winePredictionService.getAllPredictions().subscribe(
      (response: WinePrediction[]) => {
        this.winePrectionsList = response;
        if (response) {
          this.winePrectionsList = response;
        }
      },
      (error) => {
        console.error('Error fetching predictions:', error);
      }
    );
  }

  updateSelectedPredictions(): void {
    if (this.selectedWine && this.winePrectionsList.length > 0) {
      this.selectedPredictions = this.winePrectionsList.filter(
        (prediction) => prediction.idWine === this.selectedWine.id
      );

      // Actualizar las fechas y calidades para la gráfica
      this.predictionsDatesChart = this.selectedPredictions.map((prediction) => prediction.dateCreated);
      this.qualityWineChart = this.selectedPredictions.map((prediction) => prediction.quality);

      // Actualizar el gráfico con los nuevos datos
      this.updateChartData();

      console.log('Fechas seleccionadas para la gráfica:', this.predictionsDatesChart);
      console.log('Calidades seleccionadas para la gráfica:', this.qualityWineChart);
    }
  }

  onWineSelect(selectedWine: any): void {
    this.selectedWine = selectedWine;
    console.log(this.selectedWine);
    this.updateSelectedPredictions(); // Actualiza las predicciones al seleccionar un vino
  }

  deleteTable() {
    this.selectedWine = null; // Deseleccionar el vino seleccionado
    this.selectedPredictions = []; // Vaciar las predicciones seleccionadas
    console.log('Tabla limpiada, vino deseleccionado y predicciones eliminadas.');
  }

  updateChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    // Actualiza el objeto de datos del gráfico
    this.data = {
      labels: this.predictionsDatesChart,
      datasets: [
        {
          label: 'Quality',
          data: this.qualityWineChart,
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        }
      ]
    };
  }
}
