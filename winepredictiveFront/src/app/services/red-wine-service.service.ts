import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedWineServiceService {

 
  private apiUrl = 'http://localhost:5000/predict/red'; 

  constructor(private http: HttpClient) { }

  predictWineQuality(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { features: data });
  }
}
