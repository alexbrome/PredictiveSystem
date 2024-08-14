import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-red-wine-charts',
  standalone: true,
  imports: [],
  templateUrl: './red-wine-charts.component.html',
  styleUrl: './red-wine-charts.component.css'
})
export class RedWineChartsComponent {
  qualityPredicted: Number = 0
  dataSharing:Number[]=[]

  constructor(private dataSharingService: DataSharingService) {
  }

  ngOnInit(): void {
    this.qualityPredicted = this.dataSharingService.getRedWineQualityPredicted();
    this.dataSharing = this.dataSharingService.getRedWineData();
    console.log(this.dataSharing);
    console.log(this.qualityPredicted);
  }
}
