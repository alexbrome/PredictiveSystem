import { Injectable } from '@angular/core';
import { Measure } from '../models/Measure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

//private apiUrl = 'http://localhost:8081/api/measure';
private apiUrl = environment.apiBaseUrl + '/measure';

  constructor(private http:HttpClient) { }

  createMeasure(measure: Measure): Observable<Measure> {
    console.log('Measure to save desde el servicio de angular:', measure);
    
    return this.http.post<Measure>(this.apiUrl, measure);
  }

  getMeasuresByWineId(wineId: number): Observable<Measure[]> {
    const url = `${this.apiUrl}/${wineId}`;
    return this.http.get<Measure[]>(url);
  }

}
