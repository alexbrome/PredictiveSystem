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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { Measure } from '../../models/Measure';
import { MeasureService } from '../../services/measure.service';



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
    CommonModule,
    ConfirmDialogModule
  ],
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css'],
  providers: [MessageService,ConfirmationService]
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

  //Creating Measure
  createMeasureDialogVisible: boolean = false;
  measureDate:any = new Date();
  measureDescription: string = '';
  selectedWineId: number = 0;
  measureToSave: Measure = new Measure(this.measureDescription, this.measureDate, this.selectedWineId);

  //Constructor
  constructor(private userService: UserService,
    private wineService: WineService,
    private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private router: Router,
private measureService:MeasureService) { }


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
 console.log("Delete wine, id del vino a eliminar: ", id);
 
    this.confirmationService.confirm({
      message: '¿Are you sure to delete this prediction?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Acción al confirmar
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
      },
      reject: () => {
      }
    });

  }

  //Make CreateWine Dialog turn into visible
  showDialog() {
    this.createWineDialogVisible = true;
  }

  showDialogMeasure(wineId:number) {
    this.selectedWineId = wineId;
    this.createMeasureDialogVisible = true;

    }

   goToSummary(id: any) {
      this.router.navigate(['/summaryWhite',id]);

}

createMeasure() {       
  this.measureToSave.created = this.measureDate;
  this.measureToSave.idWine = this.selectedWineId;
  this.measureToSave.description = this.measureDescription;
  console.log(this.measureToSave);
  
  this.measureService.createMeasure(this.measureToSave).subscribe(
    
    
    (resp) => {
      console.log(resp);

      // close modal
      this.createMeasureDialogVisible = false;

      //Sucess message
      this.messageService.add({
        severity: 'success',
        summary: 'Succes',
        detail: '¡Measure saved successfully!'
      });
      this.getWinesByUserId();
    },
    //Error message
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error saving measure'
      });
    }
  );
}
}