import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../auth/services/storage.service';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { Socket } from 'dgram';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

private socket!:Socket;

  constructor(private http: HttpClient) {
  
  }

  // Método para crear los encabezados de autorización
  createAthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    if (token) {
      authHeaders = authHeaders.set('Authorization', 'Bearer ' + token);
    }
    return authHeaders;
  }
private readonly apiUrl = 'http://localhost:8081/api/v1/llm'; // URL del backend


  // Método para hacer la solicitud de chat
  chat(query: string): Observable<any> {
    const params = new HttpParams().set('query', query); // Añadir el parámetro 'query'
    const headers = this.createAthorizationHeader(); // Crear los encabezados con el token

    // Aumenta el tiempo de espera a 60 segundos (60000 ms) y maneja errores
    return this.http.get<string>(this.apiUrl, { 
      params, 
      headers: this.createAthorizationHeader(),
      responseType: 'text' as 'json'  // Espera la respuesta como texto
    }).pipe(
      timeout(6000000), // Tiempo de espera de 60 segundos (puedes ajustarlo)
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la petición', error);
        return throwError(error);
      })
    );
  }


}
