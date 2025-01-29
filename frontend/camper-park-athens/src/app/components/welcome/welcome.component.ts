import { Component, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import  {MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [MatButtonModule, MatIconModule, RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  isAdmin: boolean = false;

  constructor(private userService: UserService) {
    effect(() => {
      const loggedInUser = this.userService.user();
      console.log('Logged in user:', loggedInUser);
      this.isAdmin = loggedInUser?.role === 'admin';
    });
  }
}
