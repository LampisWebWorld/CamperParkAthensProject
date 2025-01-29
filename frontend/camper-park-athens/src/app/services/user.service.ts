import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Credentials, User, LoggedInUser } from '../shared/interfaces/mongo-backend';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SignJWT } from 'jose';
import { environmentKey } from '../../environments/environment';
import { Observable } from 'rxjs';

const API_URL=`${environment.apiURL}`
const SECRET_KEY = `${environmentKey.SECRET_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
    http: HttpClient = inject(HttpClient)
    router = inject(Router);

    user = signal<LoggedInUser | null>(null)

    constructor(){
        const token = localStorage.getItem("token")
        if (token) {
            const decodedTokenSubject = jwtDecode(token) as any;
          
            if (decodedTokenSubject?.username && decodedTokenSubject?.email) {
              this.user.set({
                username: decodedTokenSubject.username,
                email: decodedTokenSubject.email,
                role: decodedTokenSubject.role
              });
            } else {
                console.error('Invalid token subject:', decodedTokenSubject);
            }
        }
        effect(() =>{
            if (this.user()){
                console.log("User logged in: ", this.user()?.username);          
            } else {
                console.log('No user logged in');
            }
        })
    }

    private async generatePasswordToken(password: string): Promise<string> {
        try {
            const token = await new SignJWT({ password })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('1m')
                .sign(new TextEncoder().encode(SECRET_KEY));
            console.log('Generated Token:', token);
            return token;
        } catch (error) {
            console.error('Error generating token:', error);
            throw error;
        }
    }

    registerUser(user: User) {
        return this.generatePasswordToken(user.password!).then((passwordToken) => {
            const userWithToken = { ...user, password: passwordToken }; 
            return this.http.post<{ msg: string }>(`${API_URL}/auth/register`, userWithToken);
        });
    }

    loginUser(credentials: Credentials) {
        return this.generatePasswordToken(credentials.password!).then((passwordToken) => {
            const credentialsWithToken = { ...credentials, password: passwordToken }; 
            return this.http.post<{ token: string }>(`${API_URL}/auth/login`, credentialsWithToken);
        });
    }
    

    logoutUser(){
        this.user.set(null);
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }

    showAllPersons(): Observable<any>{
          return this.http.get(`${API_URL}/users/`)
        }
    
    showUser(username: string): Observable<any> {
        return this.http.get<User>(`${API_URL}/users/${username}`)
    }

    updateUser(user: User, username: string){
        console.log("Username in update: ", username)
        return this.http.patch<User>(`${API_URL}/users/${username}`, user)
    }

    deleteUser(username: string){
        return this.http.delete(`${API_URL}/users/${username}`)
    }
}
