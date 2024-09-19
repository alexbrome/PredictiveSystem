import { Component, OnInit } from '@angular/core';

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
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
MenubarModule, BadgeModule, AvatarModule, InputTextModule,
 RippleModule, CommonModule,ToolbarModule,
 ButtonModule,ConfirmDialogModule,ToastModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [MessageService,ConfirmationService]
})
export class NavbarComponent implements OnInit{


idUser: any = (StorageService.getUserId());

user:any;
  items: MenuItem[] | undefined;

constructor(private router:Router,private userService:UserService,
  private messageService:MessageService,private confirmationService: ConfirmationService,
){
  
}


  ngOnInit(): void {
    this.getUserById();
    this.isCustomerLoggedIn();
  }


isCustomerLoggedIn():Boolean{
return StorageService.isCustomerLoggedIn();
}

getUserById(){
  this.userService.getUserById(this.idUser).subscribe(
    (data: any) => {
      this.user = data;
    },
    (error) => {
      console.error('Error fetching user:', error);
    }
  );
}

logout(){
  StorageService.logout();
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You Must fill out all fields' });
  
  this.router.navigateByUrl("/");
}


//Logout confirm
logOut(event: Event) {

  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to LogOut?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'You have LoggedOut' });
          StorageService.logout();
          this.router.navigateByUrl("/");
      },
      reject: () => {
     
      }
  });
}


}


