import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateComponent } from './components/u-d/update/update.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { CustomersTableComponent } from './components/customers/customers-table/customers-table.component';
import { UpdateCustomerComponent } from './components/u-d/update-customer/update-customer.component';
import { authGuard } from './shared/guard/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: "welcome", component: WelcomeComponent, canActivate: [authGuard] },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "register", component: RegisterComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: "users-table", component: UsersTableComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: "login", component: LoginComponent },
  { path: "update/:username", component: UpdateComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: "new-customer", component: CreateCustomerComponent, canActivate: [authGuard], data: { role: 'user' } },
  { path: "customers-table", component: CustomersTableComponent, canActivate: [authGuard], data: { role: 'user' } },
  { path: "update-customer/:username", component: UpdateCustomerComponent, canActivate: [authGuard], data: { role: 'user' } },
  { path: "unauthorized", component: UnauthorizedComponent }
];
