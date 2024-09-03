import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

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

  static logout(): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
