import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../auth/services/storage.service';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { WineService } from '../../services/wine.service';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RatingModule,
    FormsModule
  ],
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent implements OnInit {
  idUser: any = StorageService.getUserId();
  user: any;
  lista: any[] = [];
  wines: any[] = [];

  constructor(private userService: UserService, private wineService: WineService) {}

  ngOnInit(): void {
    this.getUserById();
    this.getWinesByUserId();
  }

  getUserById() {
    this.userService.getUserById(this.idUser).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        
      }
    );
  }

  getWinesByUserId() {
    this.wineService.getAllWinesByUserId(this.idUser).subscribe(
      (data) => {
        this.wines = data;
        this.wines.forEach(wine => {
          // Asignar la calidad más reciente a cada vino
          wine.quality = this.getLatestQuality(wine);
        });
       
      },
      (error) => {
        console.error('Error fetching wines:', error);
      }
    );
  }

  getLatestQuality(wine: any): number {
    if (!wine.winePredictions || wine.winePredictions.length === 0) {
      return 0; // Value if there is not prediction for this wine
    }
    
    // Latest date
    const latestPrediction = wine.winePredictions.reduce((prev: any, current: any) => {
      return new Date(prev.dateCreated) > new Date(current.dateCreated) ? prev : current;
    });
    return latestPrediction.quality;
  }
}
