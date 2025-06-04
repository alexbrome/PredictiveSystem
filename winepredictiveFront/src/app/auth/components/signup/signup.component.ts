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
  providers: [MessageService, ToastModule]
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidate.bind(this)]],
    });
  }

  // Custom validation for password confirmation
  // This function checks if the confirmation password matches the original password
  confirmationValidate(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  // Create user
register() {
  if (this.signupForm.valid) {
    this.authService.register(this.signupForm.value).subscribe((res) => {
      if (res.id != null) {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratulations!',
          detail: 'User has been registered',
        });

        // Espera un poco antes de navegar (por ejemplo, 2 segundos)
        setTimeout(() => {
          this.router.navigateByUrl("/homeAdmin");
        }, 2000);
      }
    }, (error: any) => {
       if (error.status === 409 && error.error?.message?.includes('Email')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Email already exists',
            detail: 'Please choose a different email.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill in all required fields correctly.',
          });
        }
    });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill in all required fields correctly.',
    });
  }
}

}
