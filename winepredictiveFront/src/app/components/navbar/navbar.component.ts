import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { Router } from '@angular/router';
import { StorageService } from '../../auth/services/storage.service';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule, BadgeModule, AvatarModule, InputTextModule,
    RippleModule, CommonModule, ToolbarModule,
    ButtonModule, ConfirmDialogModule, ToastModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [MessageService, ConfirmationService]
})
export class NavbarComponent implements OnInit, OnDestroy {
  idUser: any = StorageService.getUserId();
  user: any;
  private userSubscription!: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.idUser = StorageService.getUserId();

    // Suscribirse a los cambios del usuario
    this.userSubscription = this.storageService.getUserObservable().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  getUserById(): void {
    this.userService.getUserById(Number(this.idUser)).subscribe(
      data => StorageService.saveUser(data),
      error => console.error('Error fetching user:', error)
    );
  }

  isCustomerLoggedIn(): boolean {
    return StorageService.isCustomerLoggedIn();
  }

  isAdminLoggedIn(): boolean {
    return StorageService.isAdminLoggedIn();
  }

  logOut(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to LogOut?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        StorageService.logout(); 
        window.localStorage.removeItem('USER');
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'You have LoggedOut' });
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
      }
    });
  }
}
