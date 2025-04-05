import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { WinePredictionsService } from '../../services/wine-predictions.service';
import { WinePrediction } from '../../models/winePrediction';
import { WineService } from '../../services/wine.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { StorageService } from '../../auth/services/storage.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChartModule } from 'primeng/chart';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';
import { ChatServiceService } from '../../services/chat-service.service';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import  wineQualityStats  from '../../models/wineQualityStats';


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
    SpeedDialModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    

  ],
  providers: [ConfirmationService, MessageService, DatePipe],
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
  wineName: any = null;

  /*Dropodown values*/
  wineProperties = [
    { label: "Fixed Acidity", value: "fixedAcidity" },
    { label: "Volatile Acidity", value: "volatileAcidity" },
    { label: "Citric Acid", value: "citricAcid" },
    { label: "Residual Sugar", value: "residualSugar" },
    { label: "Chlorides", value: "chlorides" },
    { label: "Free Sulfur Dioxide", value: "freeSulfurDioxide" },
    { label: "Total Sulfur Dioxide", value: "totalSulfureDioxide" },
    { label: "Density", value: "density" },
    { label: "pH", value: "pH" },
    { label: "Sulphates", value: "sulphates" },
    { label: "Alcohol", value: "alcohol" },
    { label: "Quality", value: "quality" }
  ];

  /*Chart Visibles*/
  selectedChartOption: string = "";
  selectedProperties: string[] = [];
  isAllSelected: boolean = false; // 🔹 Nueva variable para controlar "Select All"

  //Checkboxes selected
  selectedProperty: string[] = [];

  //ChatLlama
  response: any | null = null;

  // Chart
  options: any;
  data: any;
  predictionsDatesChart: any[] = [];
  qualityWineChart: any[] = [];
  chartData: { [key: string]: any } = {};


  //Slider hidden or shown
  isHidden: boolean = true;

  constructor(private winePredictionService: WinePredictionsService, private wineService: WineService,
    private eRef: ElementRef, private confirmationService: ConfirmationService, private messageService: MessageService,
    private dataSharingService: DataSharingService, private router: Router,
    private chatService: ChatServiceService, private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getWinesByUserId();
    this.getAllPredictions();
    const documentStyle = getComputedStyle(document.documentElement);

  }

//Getters Functions from Services
  getWinesByUserId() {
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


  //Update selected predictions based on selected wine
  updateSelectedPredictions(): void {
    if (this.selectedWine && this.winePrectionsList.length > 0) {
      this.selectedPredictions = this.winePrectionsList.filter(
        (prediction) => prediction.idWine === this.selectedWine.id
      );

      // Update Dates and quality for charts
      this.predictionsDatesChart = this.selectedPredictions.map((prediction) => prediction.dateCreated);
      this.qualityWineChart = this.selectedPredictions.map((prediction) => prediction.quality);


    }
  }

  //Get selected wine 
  onWineSelect(selectedWine: any): void {
    if (!selectedWine) return;

    this.selectedWine = selectedWine;
    this.isHidden = true;

    // Actualiza las predicciones filtrando por el vino seleccionado
    this.updateSelectedPredictions();

    // Si hay propiedades seleccionadas, actualiza los gráficos con la primera de la lista
    if (this.selectedProperties.length > 0) {
      this.selectedProperties.forEach(property => this.updateChartData(property));//Aqui esta el problema
    } else {
      this.chartData = {}; // Limpiar datos si no hay propiedades seleccionadas
    }
  }

//Clean table
  deleteTable() {
    this.selectedWine = null;
    this.selectedPredictions = [];
  }


  //Hide or show slider
  toggleVisibility(event: Event) {
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

  deletePrediction(id: number) {
    this.confirmationService.confirm({
      message: '¿Are you sure to delete this prediction?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Acción al confirmar
        this.winePredictionService.deleteWinePredictionById(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have deleted the item' });
            // Eliminar la predicción de la lista local
            this.winePrectionsList = this.winePrectionsList.filter(prediction => prediction.id !== id);

            // Actualizar las predicciones seleccionadas si es necesario
            this.updateSelectedPredictions();
          },
          error: (err) => {
            this.messageService.add({ severity: 'danger', summary: 'danger', detail: 'Error deleting this item' });
          }
        });
      },
      reject: () => {
      }
    });

  }

  goToPredictionChart(id: number): void {
    // Get wineselected by ID
    const selectedPrediction = this.winePrectionsList.find(prediction => prediction.id === id);


    if (selectedPrediction) {
      // Data to send to Service
      const dataToSend = [
        parseFloat(selectedPrediction.fixedAcidity),
        parseFloat(selectedPrediction.volatileAcidity),//237
        parseFloat(selectedPrediction.citricAcid),//
        parseFloat(selectedPrediction.residualSugar),
        parseFloat(selectedPrediction.chlorides),
        parseFloat(selectedPrediction.freeSulfurDioxide),
        parseFloat(selectedPrediction.totalSulfureDioxide),//
        parseFloat(selectedPrediction.density),
        parseFloat(selectedPrediction.ph),
        parseFloat(selectedPrediction.sulphates),
        parseFloat(selectedPrediction.alcohol),
      ];

      // Send Data to DataSharingService
      this.dataSharingService.setWhiteWineData(dataToSend);
      this.dataSharingService.setWhiteWineQualityPredicted(selectedPrediction.quality);
      this.dataSharingService.setNameWine(this.selectedWine);



      // Navegar a la página de gráficos (asegúrate de configurar la ruta correctamente)
      this.router.navigate(['whiteWine-page/whiteWineCharts']);
    } else {
      console.error('Prediction not found');
    }
  }

  goToIAChat(predictionId: number) {
    this.router.navigate(['/chat', predictionId]);
  }


  //Checkboxes functions 

  onCheckboxChange(event: any, label: string): void {
    if (event.checked) {
      if (!this.selectedProperties.includes(label)) {
        this.selectedProperties.push(label);
        this.updateChartData(label); // Actualizar solo el gráfico correspondiente
      }
    } else {
      this.selectedProperties = this.selectedProperties.filter(item => item !== label);
      delete this.chartData[label]; // Eliminar los datos de la propiedad desmarcada
    }
    this.updateSelectedPredictions();
    console.log('Selected Properties:', this.selectedProperties);
  }


  //Select All CheckBoxes
  onClickSelectAllCheckBoxes(event: any): void {
    this.isAllSelected = event.checked; // Actualiza el estado de "Select All"
    if (event.checked) {
      this.selectedProperties = this.wineProperties.map(property => property.label);
      this.selectedProperty = this.wineProperties.map(property => property.value);
    } else {
      this.selectedProperties = [];
      this.selectedProperty = [];
    }
    console.log('Selected Properties:', this.selectedProperties);

    // Actualiza cada gráfico para las propiedades seleccionadas
    this.selectedProperties.forEach(prop => this.updateChartData(prop));
  }


  updateChartData(property: string): void {
    // Limpiar datos del gráfico antes de actualizar
    const documentStyle = getComputedStyle(document.documentElement);

   


    // Mapeo correcto de nombres visibles a nombres de clave en JSON
    const propertyMap: { [key: string]: { keyForStats: string; keyForPrediction: string } } = {
      "Fixed Acidity": { keyForStats: "Fixed Acidity", keyForPrediction: "fixedAcidity" },
      "Volatile Acidity": { keyForStats: "Volatile Acidity", keyForPrediction: "volatileAcidity" },
      "Citric Acid": { keyForStats: "Citric Acid", keyForPrediction: "citricAcid" },
      "Residual Sugar": { keyForStats: "Residual Sugar", keyForPrediction: "residualSugar" },
      "Chlorides": { keyForStats: "Chlorides", keyForPrediction: "chlorides" },
      "Free Sulfur Dioxide": { keyForStats: "Free Sulfur Dioxide", keyForPrediction: "freeSulfurDioxide" },
      "Total Sulfur Dioxide": { keyForStats: "Total Sulfur Dioxide", keyForPrediction: "totalSulfurDioxide" },
      "Density": { keyForStats: "Density", keyForPrediction: "density" },
      "pH": { keyForStats: "pH", keyForPrediction: "ph" },
      "Sulphates": { keyForStats: "Sulphates", keyForPrediction: "sulphates" },
      "Alcohol": { keyForStats: "Alcohol", keyForPrediction: "alcohol" },
      "Quality": { keyForStats: "Quality", keyForPrediction: "quality" }
    };
    

    const propertyKey = propertyMap[property]; // Obtener el nombre correcto
    const mapping = propertyMap[property];
    // Si la propiedad es válida, actualiza el gráfico correspondiente
    if (mapping) {
      const referenceValue = wineQualityStats[mapping.keyForStats];
      const propertyKeyForPrediction = mapping.keyForPrediction;
    
      const formattedDates = this.predictionsDatesChart.map(date =>
        this.datePipe.transform(date, 'dd/MM/yyyy')
      );
    
      this.chartData[property] = {
        labels: formattedDates,
        datasets: [
          {
            label: property,
            data: this.selectedPredictions.map(prediction => {
              const value = prediction[propertyKeyForPrediction];
              console.log(`Prediction:`, prediction);
              console.log(`Value for ${propertyKeyForPrediction}:`, value);
              return value ?? 0;
            }),
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--blue-500')
          },
          {
            label: "Average Best 30",
            data: Array(formattedDates.length).fill(referenceValue),
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--pink-500')
          }
        ]
      };
    }
  }



}