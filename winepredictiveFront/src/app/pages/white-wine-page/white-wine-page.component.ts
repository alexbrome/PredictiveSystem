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



@Component({
  selector: 'app-white-wine-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputNumberModule, ButtonModule,AutoCompleteModule
    ,CommonModule,ToastModule 
  ],
  templateUrl: './white-wine-page.component.html',
  styleUrl: './white-wine-page.component.css',
  providers: [MessageService]
})


export class WhiteWinePageComponent implements OnInit{

  messages!: Message[] ;

  /*MOCK Wines available*/
  wines: any[] = [
    { name: 'Merlot' },
    { name: 'Chardonnay' },
    { name: 'Cabernet Sauvignon' },
    { name: 'Pinot Noir' },
    { name: 'Sauvignon Blanc' }
  ];

  /*Wine name form*/
  selectedWine: FormControl = new FormControl('');
  filteredWines!: any[];
  selectWineFormGroup:FormGroup;

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
  quality: Number = 0;
  
  ngOnInit(): void {
   
  }

  constructor(private whiteWineQualityService: WhiteWineServiceService, private http: HttpClient,
    private dataSharingService: DataSharingService,
    private router: Router,
    private messageService:MessageService
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
    
    
    
    /*Wine name form*/
    this.selectWineFormGroup = new FormGroup({
      selectedWine : this.selectedWine
    })
  }
  
  /*Submit form*/
  handleSubmit() {
    if (this.wineForm.invalid) {
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

/*Filter wines from select input*/
filterWines(event: AutoCompleteCompleteEvent) {
  let filtered: any[] = [];
  let query = event.query;

  for (let i = 0; i < (this.wines as any[]).length; i++) {
      let wine = (this.wines as any[])[i];
      if (wine.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(wine);
      }
  }

  this.filteredWines = filtered;
}

}
