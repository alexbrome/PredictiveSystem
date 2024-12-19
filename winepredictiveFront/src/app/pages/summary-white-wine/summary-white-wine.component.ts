import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
import { SpeedDialModule } from 'primeng/speeddial';

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
    ChartModule,
    SpeedDialModule
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

  //Slider hidden or shown
  isHidden: boolean = true;

  constructor(private winePredictionService: WinePredictionsService, private wineService: WineService,
    private eRef: ElementRef
  ) {}

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

      // Update Dates and quality for charts
      this.predictionsDatesChart = this.selectedPredictions.map((prediction) => prediction.dateCreated);
      this.qualityWineChart = this.selectedPredictions.map((prediction) => prediction.quality);

      this.updateChartData();
    }
  }

  onWineSelect(selectedWine: any): void {
    this.selectedWine = selectedWine;
    this.isHidden = true
    this.updateSelectedPredictions();
  }

  deleteTable() {
    this.selectedWine = null; 
    this.selectedPredictions = []; 
  }

  updateChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    //Upgrade data chart
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

//Hide or show slider
toggleVisibility(event:Event) {
  event.stopPropagation();
  this.isHidden = !this.isHidden;
}

//Event to close slider on click at any part of window
@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  const target = event.target as HTMLElement;
  const toggleButton = document.querySelector('button'); 
  if (!this.eRef.nativeElement.contains(target) && target !== toggleButton && !this.isHidden) {
    this.isHidden = true;
  }
}



}
