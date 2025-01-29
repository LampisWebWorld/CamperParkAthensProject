import { Component, inject } from '@angular/core';
import { Credentials } from '../../shared/interfaces/mongo-backend';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUser } from '../../shared/interfaces/mongo-backend';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userService = inject(UserService);
  router = inject(Router)

  invalidLogin = false;

  form = new FormGroup ({
        username: new FormControl('', Validators.required),
        password: new FormControl('',Validators.required)
  })

  async onSubmit() {
    const credentials = this.form.value as Credentials
    console.log(credentials)
    ;(await this.userService.loginUser(credentials)).subscribe({
      next: (response) => {
        console.log(response)
        const token = response.token
        console.log(token);
                localStorage.setItem("token", token);
                
                const decodedTokenSubject = jwtDecode(token)
                 .sub as unknown as LoggedInUser;
                console.log(decodedTokenSubject)
                
                this.userService.user.set({
                    username: decodedTokenSubject.username,
                    email: decodedTokenSubject.email,
                    role: decodedTokenSubject.role
                })
                this.router.navigate(['welcome']);
            },
            error: (error) =>{
                console.log('Login Error', error);
                this.invalidLogin = true;
            }
    })
  }
}