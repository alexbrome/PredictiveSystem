import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';
@Injectable({
  providedIn: 'root'
})
export class UserService {

 //privateapiUrl = 'http://localhost:8081/api/users';
 private apiUrl = environment.apiBaseUrl + '/users';


  constructor(private http:HttpClient) { }


 getUserById(id:number):Observable<any>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<any>(url)
 }

 getAllUsers(){
  const url = `${this.apiUrl}`;
  return this.http.get<any>(url);
 }

deleteUserById(userId:any){
  const url = `${this.apiUrl}/${userId}`;
  return this.http.delete(url)
}
}
