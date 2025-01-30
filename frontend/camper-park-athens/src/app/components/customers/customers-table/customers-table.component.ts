import { Component, inject, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../shared/interfaces/mongo-backend';
import { UsernameService } from '../../../services/username.service';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-table',
  imports: [MatIconModule, NgFor, NgIf],
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit {

  @Input() cusotmer: Customer | undefined;

  customers: any[] = [];

  router = inject(Router);

  constructor(private customerService: CustomerService, private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.customers);
  }

  loadUsers(): void {
    this.customerService.showAllCustomers().subscribe({
      next: (response: { data: Customer[]; }) => {
        this.customers = response.data;
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
        alert('Failed to load users.');
      },
    });
  }

  selectUser(username: string): void {
    this.usernameService.setUsername(username);
    console.log('Selected username:', username);
    this.router.navigate(['/update-customer', username]);
  }

  delete(username: string): void {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
    if (isConfirmed) {
      this.usernameService.setUsername(username);
      console.log('Selected username:', username);
  
      this.customerService.deleteUser(username).subscribe({
        next: (response) => {
          console.log("User deleted successfully", response);
          this.loadUsers()
        },
        error: (error) => {
          console.log("Error deleting user:", error);
        }
      });
    } else {
      console.log("User deletion was canceled.");
    }
  }
}