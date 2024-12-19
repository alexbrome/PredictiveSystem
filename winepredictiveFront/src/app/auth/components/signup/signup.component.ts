import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [MessageService,ToastModule]
})
export class SignupComponent {

  signupForm!:FormGroup


  constructor(private fb:FormBuilder,
    private authService:AuthServiceService,
    private messageService:MessageService,
    private router:Router) { }
   
   
    ngOnInit() {
      this.signupForm = this.fb.group({
        name:[null,[Validators.required]],
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required, Validators.minLength(8)]],
        checkPassword:[null,[Validators.required,this.confirmationValidate]],
      })
    }
  
    confirmationValidate = (control: FormControl):{  [s:string]:boolean }=>{
    if(!control.value){
      return {required:true };
    }else if(control.value !== this.signupForm.controls['password'].value){
      return {confirm: true , error :true}
    }
    return {}
   };
   
  
  //Create user
  register() {
    this.authService.register(this.signupForm.value).subscribe((res) => {  
      if (res.id != null) {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratulations!',
          detail: 'User has been registered',
        });
        // Delay navigation to give time to show the message
        setTimeout(() => {
          this.router.navigateByUrl("/homeAdmin");
        }, 2000);
      }
    }, (error: any) => {});
  }
  
  

}
