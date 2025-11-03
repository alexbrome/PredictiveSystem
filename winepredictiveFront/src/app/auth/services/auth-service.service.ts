import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../enviroments/enviroment.prod';

//const BASE_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  constructor(private http:HttpClient) { }


 login(loginRequest:any):Observable<any>{
  console.log("Servicio del login");
  return this.http.post(environment.apiBaseUrl + "/auth/login", loginRequest, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}

register(signupRequest: any): Observable<any> {
  return this.http.post(environment.apiBaseUrl + "/auth/signup", signupRequest, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}
}
