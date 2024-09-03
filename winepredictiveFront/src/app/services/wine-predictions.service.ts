import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WinePrediction } from '../models/winePrediction';
import { StorageService } from '../auth/services/storage.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class WinePredictionsService {

  private apiUrl = 'http://localhost:8080/api/winePredictions';
  constructor(private http:HttpClient) { }

  getPredictionsByIdWine(idWine: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idWine}`,{
     headers:this.createAthorizationHeader()
    }); 
  }


   getAllPredictions():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`,{
      headers:this.createAthorizationHeader()
     }); 
 }



  createAthorizationHeader():HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' +  StorageService.getToken()
    );
  }

  
}
