import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private loggedInUser = new BehaviorSubject<any>(null);
  userChanged: EventEmitter<any> = new EventEmitter();

  constructor() { 
      // Inicializar con el usuario de localStorage si existe
      const user = StorageService.getUser();
      if (user) {
        this.loggedInUser.next(user);
      }
  }

  // Método para verificar si estamos en el navegador (cliente)
  static isBrowser(): boolean {
    return typeof window !== 'undefined';
    
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken() {
    if (this.isBrowser()) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (this.isBrowser()) {
      const storedUser = window.localStorage.getItem(USER);
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }

   // Método para actualizar el usuario y emitir cambios
   updateUser(user: any): void {
    StorageService.saveUser(user);
    this.loggedInUser.next(user);
  }

  static isAdminLoggedIn(): boolean {
    if (!this.isBrowser() || this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.isBrowser() || this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }
    // Observable para el usuario
    getUserObservable() {
      return this.loggedInUser.asObservable();
    }

  static logout(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
      
    }
  }
   // Método para emitir null en logout
   logOutUser(): void {
    StorageService.logout();
    this.userChanged.emit(null); // Emitir evento de logout
  }
 
}
