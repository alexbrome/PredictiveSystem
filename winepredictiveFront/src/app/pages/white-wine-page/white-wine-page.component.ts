import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { WhiteWineServiceService } from '../../services/white-wine-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { WineService } from '../../services/wine.service';
import { StorageService } from '../../auth/services/storage.service';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-white-wine-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputNumberModule, ButtonModule,AutoCompleteModule
    ,CommonModule,ToastModule,DropdownModule
  ],
  templateUrl: './white-wine-page.component.html',
  styleUrl: './white-wine-page.component.css',
  providers: [MessageService]
})


export class WhiteWinePageComponent implements OnInit{

  messages!: Message[] ;
  idUser:any = +StorageService.getUserId();

  /*MOCK Wines available*/
  wines: any[] = [];

  /*Wine name form*/
  selectedWine: FormControl = new FormControl('',Validators.required);
  filteredWines!: any[];
  selectWineFormGroup!:FormGroup;

  /*FormGroup variable wine parameters*/
  wineForm: FormGroup;

  /*form fields*/
  fixed_acidity: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  volatile_acidity: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  citric_acidity: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  residual_sugar: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  chlorides: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  free_sulfur_dioxide: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  total_sulfur_dioxide: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  density: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  ph: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  sulphates: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  alcohol: FormControl = new FormControl('',[Validators.required,Validators.min(0)])
  quality: any = 0;
  
  ngOnInit(): void {
    this.getWinesByUserId();

   /*Wine name form*/
   this.selectWineFormGroup = new FormGroup({
    selectedWine : this.selectedWine
  })
  }

  //Constructor
  constructor(private whiteWineQualityService: WhiteWineServiceService, private http: HttpClient,
    private dataSharingService: DataSharingService,
    private router: Router,
    private messageService:MessageService,
    private wineService:WineService
  ) {

    this.wineForm = new FormGroup({
      fixed_acidity: this.fixed_acidity,
      volatile_acidity: this.volatile_acidity,
      citric_acidity: this.citric_acidity,
      residual_sugar: this.residual_sugar,
      chlorides: this.chlorides,
      free_sulfur_dioxide: this.free_sulfur_dioxide,
      total_sulfur_dioxide: this.total_sulfur_dioxide,
      density: this.density,
      ph: this.ph,
      sulphates: this.sulphates,
      alcohol: this.alcohol,
      
    });
    
    
    
    
  }
  
  /*Submit form*/
  handleSubmit() {
    if(this.selectedWine.invalid){
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Must fill out wine name field' });
    }
    else{
    if (this.wineForm.invalid ) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Must fill out all fields' });
    }
  
    else{
   
    const formData = this.wineForm.value;

    // Convert form data to the format expected by the backend
    const dataToSend = [
      parseFloat(formData.fixed_acidity || '0'),
      parseFloat(formData.volatile_acidity || '0'),
      parseFloat(formData.citric_acidity || '0'),
      parseFloat(formData.residual_sugar || '0'),
      parseFloat(formData.chlorides || '0'),
      parseFloat(formData.free_sulfur_dioxide || '0'),
      parseFloat(formData.total_sulfur_dioxide || '0'),
      parseFloat(formData.density || '0'),
      parseFloat(formData.ph || '0'),
      parseFloat(formData.sulphates || '0'),
      parseFloat(formData.alcohol || '0'),

    ];
    //Query to get quality prediction
    
    this.whiteWineQualityService.predictWineQuality(dataToSend).subscribe(
      (response: { quality: Number; }) => {
        this.quality = response.quality;
       

        /* Set name wine to service*/ 
        this.dataSharingService.setNameWine(this.selectWineFormGroup.value);

        //Send data to dataSharingService
        this.dataSharingService.setWhiteWineData(dataToSend);
        this.dataSharingService.setWhiteWineQualityPredicted(this.quality);

        /*Navigate to summary*/
        this.router.navigate(['whiteWine-page/whiteWineCharts'])
      },
      (error: any) => {
        console.error('Error al predecir la calidad del vino:', error);
      }
    );
  }
    }
  }
  
  //Save prediction to BBDD
  savePrediction() {
    if (!this.selectedWine.value || this.selectedWine.invalid ) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un vino' });
      return;
    }

    if (this.wineForm.invalid ) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Must fill out all fields' });
    }else{

    //Data to send API IA
    const formData = this.wineForm.value;
    const dataToSend = [
      parseFloat(formData.fixed_acidity || '0'),
      parseFloat(formData.volatile_acidity || '0'),
      parseFloat(formData.citric_acidity || '0'),
      parseFloat(formData.residual_sugar || '0'),
      parseFloat(formData.chlorides || '0'),
      parseFloat(formData.free_sulfur_dioxide || '0'),
      parseFloat(formData.total_sulfur_dioxide || '0'),
      parseFloat(formData.density || '0'),
      parseFloat(formData.ph || '0'),
      parseFloat(formData.sulphates || '0'),
      parseFloat(formData.alcohol || '0'),

    ];

    //Data to send to backEnd
    const predictionData = {
      idWine: this.selectedWine.value.id,  // 
      fixedAcidity: parseFloat(this.wineForm.value.fixed_acidity || '0'),
      volatileAcidity: parseFloat(this.wineForm.value.volatile_acidity || '0'),
      citricAcid: parseFloat(this.wineForm.value.citric_acidity || '0'),
      residualSugar: parseFloat(this.wineForm.value.residual_sugar || '0'),
      chlorides: parseFloat(this.wineForm.value.chlorides || '0'),
      freeSulfurDioxide: parseFloat(this.wineForm.value.free_sulfur_dioxide || '0'),
      totalSulfureDioxide: parseFloat(this.wineForm.value.total_sulfur_dioxide || '0'),
      density: parseFloat(this.wineForm.value.density || '0'),
      ph: parseFloat(this.wineForm.value.ph || '0'),
      sulphates: parseFloat(this.wineForm.value.sulphates || '0'),
      alcohol: parseFloat(this.wineForm.value.alcohol || '0'),
      quality: 0  
    };
  
    //Service to get quality from IA Servicio 
    this.whiteWineQualityService.predictWineQuality(dataToSend).subscribe(
      (response: { quality: Number; }) => {
        this.quality = response.quality;
        predictionData.quality = this.quality; // Update quality
  
        // Call service to save prediction
        this.wineService.savePrediction(predictionData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: '¡Predicción guardada con éxito!' });
          },
          (error) => {
            console.error('Error al guardar la predicción:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar la predicción' });
          }
        );
      },
      (error: any) => {
        console.error('Error al predecir la calidad del vino:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al predecir la calidad del vino' });
      }
    );}
  }

//GetWineBsyID
getWinesByUserId(){
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


/*Filter wines from name select input*/


}
