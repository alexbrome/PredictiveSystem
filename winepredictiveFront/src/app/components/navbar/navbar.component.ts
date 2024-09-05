import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
MenubarModule, BadgeModule, AvatarModule, InputTextModule,
 RippleModule, CommonModule,ToolbarModule,
 ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


idUser: any = (StorageService.getUserId());

user:any;
  items: MenuItem[] | undefined;

constructor(private router:Router,private userService:UserService){
  
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
  console.log("Esta el customer logeado? "+this.isCustomerLoggedIn());
  
  this.router.navigateByUrl("/");
}


}


