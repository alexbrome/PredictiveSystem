import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ButtonModule } from 'primeng/button';
import {  MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService,ToastModule]
})
export class LoginComponent {

 
  loginForm!:FormGroup

//constructor
  constructor(private fb:FormBuilder,private authService:AuthServiceService,
    private router:Router, private messageService:MessageService) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email:["",[Validators.email,Validators.required]],
      password:["",[Validators.required,Validators.minLength(8)]]
    })
  }



  //Methods

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res && res.userId != null) {
          
          // User exists and authenticated
          const user = {
            id: res.userId,
            role: res.userRole,
            
          };
          
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
  
          if (StorageService.isAdminLoggedIn()) {
            this.messageService.add({
              severity: 'success',
              summary: 'Congratulations!',
              detail: 'Admin logged In'
            });
  
            // Delay 2seconds navigation in order to display succes message
            setTimeout(() => {
              this.router.navigateByUrl("/main");
            }, 2000);
  
          } else if (StorageService.isCustomerLoggedIn()) {
            this.messageService.add({
              severity: 'success',
              summary: 'Congratulations!',
              detail: `Congratulations!! ${user.role} Has logged in`
            });
  
            // Delay 2 seconds navigation in order to display succes message
            setTimeout(() => {
              this.router.navigateByUrl("/main");
            }, 2000); 
          }
        } 
      },  
      (error) => {
        // Error 403 management 
        if (error.status === 403) {
          this.messageService.add({
            severity: 'error',
            summary: 'Forbidden',
            detail: 'Invalid credentials or access denied.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred during login. Please try again.'
          });
        }
      }
    );
  }
  
  
  
  }
