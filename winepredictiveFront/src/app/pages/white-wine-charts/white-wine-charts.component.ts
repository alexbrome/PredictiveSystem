import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ChartModule } from 'primeng/chart';



@Component({
  selector: 'app-white-wine-charts',
  standalone: true,
  imports: [
    ButtonModule,RouterLink,ChartModule
  ],
  templateUrl: './white-wine-charts.component.html',
  styleUrl: './white-wine-charts.component.css'
})
export class WhiteWineChartsComponent implements OnInit {

  fixed_acidityChart: any;
  basicOptions_fixed_acidity: any;

  /*charts*/ 
  qualityPredicted: Number = 0
  dataSharing:Number[]=[]

  //Mean of 30 best wines
  fixed_acidityMean30 :Number= 7.23;
  volatile_acidity :Number= 0.267;
  citric_acid :Number= 0.345;
  residual_sugar :Number= 6.763;
  chlorides :Number= 0.043;
  free_sulfur_dioxide :Number= 33.83;
  total_sulfure_dioxide :Number= 131.916;
  density :Number= 0.993;
  pH :Number= 3.159;
  sulphates :Number= 0.435;
  alcohol :Number= 11.09;
  quality :Number= 8.166;
  wineName:any;

  constructor(private dataSharingService: DataSharingService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.wineName = this.dataSharingService.getNameWine().selectedWine;
    console.log(this.wineName)
    this.qualityPredicted = this.dataSharingService.getWhiteWineQualityPredicted();
    this.dataSharing = this.dataSharingService.getwhiteWineData();
    console.log(this.dataSharing);
    console.log(this.qualityPredicted);
  

    this.fixed_acidityChart = {
        labels: [this.wineName, '30 Best Mean'],
        datasets: [
            {
                label: 'Fixed Acidity',
                data: [this.dataSharing[0], this.fixed_acidityMean30],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions_fixed_acidity = {
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'blue'
                },
                grid: {
                    color: 'pink',
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: 'black'
                },
                grid: {
                    color: 'white',
                    drawBorder: false
                }
            }
        }
    };
}
  

// Method to go back button
goBack() {
  this.router.navigate(['whiteWine-page']);
}




}
