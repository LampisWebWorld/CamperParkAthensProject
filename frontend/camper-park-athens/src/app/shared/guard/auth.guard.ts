import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const loggedInUser = userService.user();

  if (loggedInUser) {
    const requiredRole = route.data?.['role'] as string;
    if (!requiredRole || loggedInUser.role === requiredRole || loggedInUser.role === 'admin') {
      return true;
    }
    console.error(`Access denied - Role required: ${requiredRole}`);
    return router.navigate(['unauthorized']);
  }

  console.error('Access denied - Not logged in');
  return router.navigate(['login']);
};