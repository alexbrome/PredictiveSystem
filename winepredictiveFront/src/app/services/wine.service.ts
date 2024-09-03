import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from '../auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private apiUrl = 'http://localhost:8080/api/wine';  
  private apiPredictions = 'http://localhost:8080/api/winePredictions';  

  constructor(private http: HttpClient) { }

  
  getAllWines(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      tap(response => console.log('Response from API:', response)),
      catchError(error => {
        console.error('Error in Angular:', error);
        return throwError(() => new Error('Error al obtener las wines. Inténtelo de nuevo más tarde.'));
      })
    );
  }

  
  getAllWinesByUserId(idUser: number): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    const url = `${this.apiUrl}/user/${idUser}`; 
    return this.http.get<any[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear el encabezado de autorización con el token JWT
  private createAuthorizationHeader(): HttpHeaders {
    const token = StorageService.getToken();  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);  
    }
    
    return headers;
  }

  savePrediction(predictionData: any): Observable<any> {
    return this.http.post(`${this.apiPredictions}`, predictionData);
  }


  private handleError(error: any) {
    console.error('Error al realizar la petición HTTP:', error);
    return throwError(() => new Error('Error al obtener las wines. Inténtelo de nuevo más tarde.'));
  }
}
