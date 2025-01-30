import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/interfaces/mongo-backend';
import { MatIconModule } from '@angular/material/icon';
import { UsernameService } from '../../services/username.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-table',
  imports: [MatIconModule, NgFor],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit {
  @Input() user: User | undefined

  users: User[] = [];

  router = inject(Router)

  constructor(private userService: UserService, private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.users)
  }

  loadUsers(): void {
    this.userService.showAllPersons().subscribe({
      next: (response: { data: User[]; }) => {
        this.users = response.data;
      },
        error: (error: any) => {
          console.error('Error fetching users:', error);
          alert('Failed to load users.');
        },
      }
    )
  }

  selectUser(username: string): void {
    this.usernameService.setUsername(username);
  console.log('Selected username:', username);
  this.router.navigate(['/update', username]);
  }

  delete(username: string): void {
    this.usernameService.setUsername(username);
    console.log('Selected username:', username);

    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      this.userService.deleteUser(username).subscribe({
        next: (response) => {
          console.log("User deleted successfully", response);
          this.loadUsers();
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