import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RedWineServiceService } from '../../services/red-wine-service.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-red-wine-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,InputNumberModule,ButtonModule
  ],
  providers : [HttpClientModule],
  templateUrl: './red-wine-page.component.html',
  styleUrl: './red-wine-page.component.css'
})
export class RedWinePageComponent {

  /*formGroup variable*/
  wineForm:FormGroup;

  /*form fields*/
  fixed_acidity:FormControl = new FormControl('')
  volatile_acidity:FormControl = new FormControl('')
  citric_acidity:FormControl = new FormControl('')
  residual_sugar:FormControl = new FormControl('')
  chlorides:FormControl = new FormControl('')
  free_sulfur_dioxide:FormControl = new FormControl('')
  total_sulfur_dioxide:FormControl = new FormControl('')
  density:FormControl = new FormControl('')
  ph:FormControl = new FormControl('')
  sulphates:FormControl = new FormControl('')
  alcohol:FormControl = new FormControl('')
  quality:Number = 0;
  

  constructor(private http:HttpClient,private redWineService:RedWineServiceService,
    private dataSharingService:DataSharingService,private router:Router
  ) {
  
   this.wineForm = new FormGroup({
    fixed_acidity : this.fixed_acidity,
    volatile_acidity : this.volatile_acidity,
    citric_acidity : this.citric_acidity,
    residual_sugar : this.residual_sugar,
    chlorides : this.chlorides,
    free_sulfur_dioxide : this.free_sulfur_dioxide,
    total_sulfur_dioxide : this.total_sulfur_dioxide,
    density : this.density,
    ph : this.ph,
    sulphates : this.sulphates,
    alcohol : this.alcohol,
    
   })
  }

  /*Submit form*/

  handleSubmit() {
    const formData = this.wineForm.value;
    console.log('Form data:', formData);

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
    console.log(dataToSend)

    //Query python api prediction
    this.redWineService.predictWineQuality(dataToSend).subscribe(
      (response: { quality: Number; }) => {
        this.quality = response.quality; 
        console.log('Predicted quality:', this.quality);
        //Send data to DataSharing
        this.dataSharingService.setRedWineData(dataToSend);
        this.dataSharingService.setRedWineQualityPredicted(this.quality)
        this.router.navigate(['redWine-page/redWineCharts'])
      },
      (error: any) => {
        console.error('Error al predecir la calidad del vino:', error);
      }
    );
  }
}
