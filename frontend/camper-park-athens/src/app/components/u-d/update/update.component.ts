import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsernameService } from '../../../services/username.service';
import { NgIf } from '@angular/common';
import { User } from '../../../shared/interfaces/mongo-backend';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  userService = inject(UserService)
  router = inject(Router)

  usernameService = inject(UsernameService);
  selectedUsername: string | null = null;

  searchForm = new FormGroup({
    search: new FormControl('')
})

form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    idNumber: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
})

ngOnInit(): void {
  this.usernameService.username$.pipe(take(1)).subscribe((username) => {
    this.selectedUsername = username;
    console.log('Selected username in UpdateComponent:', this.selectedUsername);

    if (this.selectedUsername) {
      this.fetchUserDetails(this.selectedUsername);
    }
  });
}

fetchUserDetails(username: string): void {
  console.log(`Fetching details for user: ${username}`);
  this.userService.showUser(username).subscribe(
    (response: any) => {
      console.log('Response received:', response);
      
      // Map the response to the form if needed
      const userData = {
        email: response.data.email,
        name: response.data.name,
        surname: response.data.surname,
        idNumber: response.data.idNumber,
        phone: response.data.phone
      };

      console.log("User data: ", userData)

      // Patch the form with the user data
      this.form.patchValue(userData);
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
}

async onSubmit(value: any){
  const user = this.form.value as User
  const username = this.selectedUsername!
  ;(await this.userService.updateUser(user, username)).subscribe({
      next: (response) => {
        console.log("User: ", user, "Username: ", username)
          console.log("Customer Updated>>", response)
          this.router.navigate(['users-table']);
      },
      error: (error) => {
          console.log("There was a problem:", error);
      }
  })
}
}
