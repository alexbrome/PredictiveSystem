import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!:FormGroup


  constructor(private fb:FormBuilder,
    private authService:AuthServiceService,
    
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
  register(){
    console.log(this.signupForm.value);
   this.authService.register(this.signupForm.value).subscribe((res)=>{
     console.log(res);
     if (res.id !=null){
      
      this.router.navigateByUrl("/");
     } else {
         
     }
     
  },
  (error: any)=>{})
  
  }


}
