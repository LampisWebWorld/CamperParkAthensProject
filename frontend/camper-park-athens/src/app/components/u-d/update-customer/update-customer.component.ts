import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsernameService } from '../../../services/username.service';
import { NgIf } from '@angular/common';
import { Customer } from '../../../shared/interfaces/mongo-backend';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-customer',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit {
  customerService = inject(CustomerService)

  router = inject(Router)

  usernameService = inject(UsernameService); // Inject the UsernameService
  selectedUsername: string | null = null; // Store the selected username

  searchForm = new FormGroup({
    search: new FormControl('')
})

form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    idNumber: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    rv: new FormGroup({
      brand: new FormControl(''),
      model: new FormControl(''),
      year: new FormControl(''),
      liscencePlate: new FormControl(''),
      length: new FormControl('')
    })
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
  this.customerService.showUser(username).subscribe(
    (response: any) => {
      console.log('Response received:', response);

      const rvData = Array.isArray(response.data.rv) && response.data.rv.length > 0 ? response.data.rv[0] : null;
      console.log(rvData)

      const customerData = {
        email: response.data.email,
        name: response.data.name,
        surname: response.data.surname,
        idNumber: response.data.idNumber,
        phone: response.data.phone,
        rv: rvData 
      };

      console.log("User data: ", customerData);
      this.form.patchValue(customerData);
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
}

async onSubmit(value: any){
  const user = this.form.value as Customer
  const username = this.selectedUsername!
  ;(await this.customerService.updateUser(user, username)).subscribe({
      next: (response) => {
        console.log("User: ", user, "Username: ", username)
          console.log("Customer Updated>>", response)
          this.router.navigate(['customers-table']);
      },
      error: (error) => {
          console.log("There was a problem:", error);
      }
  })
}
}
