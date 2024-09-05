import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../auth/services/storage.service';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { WineService } from '../../services/wine.service';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormGroup, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { Wine } from '../../models/Wine';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    ToastModule,
    
  ],
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css'],
  providers: [MessageService]
})
export class WineListComponent implements OnInit {

  //Variables to create new wine
  date: Date = new Date();
  idUser: any = StorageService.getUserId();
  user: any = {};
  wineToSave: Wine = new Wine();

  //Variables to list wines
  lista: any[] = [];
  wines: any[] = [];
  createWineDialogVisible: boolean = false;

  //Constructor
  constructor(private userService: UserService,
    private wineService: WineService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getUserById();
    this.getWinesByUserId();
  this.user = {};
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
          // Asign most current quality
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


  //save wine
  createWine() {
    this.wineToSave.idUser = this.idUser;

    // Service to save wine
    this.wineService.createWine(this.wineToSave).subscribe(
      (resp) => {
        console.log(resp);

        // close modal
        this.createWineDialogVisible = false;

        //Sucess message
        this.messageService.add({
          severity: 'success',
          summary: 'Succes',
          detail: '¡Wine saved successfully!'
        });
        this.getWinesByUserId();
      },
      //Error message
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error saving wine'
        });
      }
    );
  }

  deleteWine(id: any) {
    console.log("El id del wine al intentar borrar id" + id);

    this.wineService.delete(id).subscribe(
      (resp) => {
        // Succes messagge
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Wine deleted successfully!'
        });

        //Update wineList
        this.getWinesByUserId();
      },
      (error) => {
        // Error messagge
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error deleting wine'
        });
      }
    );
  }

  //Make CreateWine Dialog turn into visible
  showDialog() {
    this.createWineDialogVisible = true;
  }





}
