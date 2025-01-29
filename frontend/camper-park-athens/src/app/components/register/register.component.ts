import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/interfaces/mongo-backend';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserService)
  router = inject(Router);

  registrationStatus: { success: boolean, message: string } = {
    success:false,
    message: "Not attempted yet"
}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    idNumber: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)  
  },
  this.passwordConfirmPasswordValidator)

  passwordConfirmPasswordValidator(control: AbstractControl):{ [key:string] :boolean } | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if( password && confirmPassword && password!=confirmPassword) {
        form.get("confirmPassword")?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };

    }

    return null
}


  async onSubmit(value: any){
    const user = this.form.value as User
    ;(await this.userService.registerUser(user)).subscribe({
        next: (response) => {
            console.log("Customer Created>>", response)
            this.form.reset();
            this.router.navigate(['welcome']);
        },
        error: (error) => {
            console.log("There was a problem:", error);
        }
    })
}
}
