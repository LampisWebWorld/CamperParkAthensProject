import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor() { }
  
  private usernameSubject = new BehaviorSubject<string | null>(null); // To hold the username
  username$ = this.usernameSubject.asObservable(); // Observable for components to subscribe

  setUsername(username: string): void {
    this.usernameSubject.next(username); // Update the username
  }

  getUsername(): string | null {
    return this.usernameSubject.getValue(); // Retrieve the current username
  }
}
