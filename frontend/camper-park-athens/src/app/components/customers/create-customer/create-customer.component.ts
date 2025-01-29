import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../shared/interfaces/mongo-backend';

@Component({
  selector: 'app-create-customer',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {

  customerService = inject(CustomerService)
  router = inject(Router);

  registrationStatus: { success: boolean, message: string } = {
    success:false,
    message: "Not attempted yet"
  }

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


  async onSubmit(value: any){
      const customer = this.form.value as Customer
      console.log(customer)
      ;(await this.customerService.registerCustomer(customer)).subscribe({
          next: (response) => {
              console.log("Customer Created>>", response)
              this.form.reset();
              this.router.navigate(['customers-table']);
          },
          error: (error) => {
              console.log("There was a problem:", error);
          }
      })
  }

}
