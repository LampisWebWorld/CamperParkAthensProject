import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Credentials, Customer, LoggedInUser } from '../shared/interfaces/mongo-backend';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SignJWT } from 'jose';
import { environmentKey } from '../../environments/environment';
import { Observable } from 'rxjs';

const API_URL=`${environment.apiURL}`
//const SECRET_KEY = `${environmentKey.SECRET_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http: HttpClient = inject(HttpClient)
  router = inject(Router);

  constructor() {  }

  registerCustomer(customer: Customer) {
              return this.http.post<{ msg: string }>(`${API_URL}/customer`, customer);
      }

  showAllCustomers(): Observable<any>{
            return this.http.get(`${API_URL}/customer/`)
          }
// ----
  showUser(username: string): Observable<any> {
          return this.http.get<Customer>(`${API_URL}/customer/${username}`)
      }

  updateUser(customer: Customer, username: string){
          console.log("Username in update: ", username)
          return this.http.patch<Customer>(`${API_URL}/customer/${username}`, customer)
      }

  deleteUser(username: string){
        return this.http.delete(`${API_URL}/customer/${username}`)
    }
}
