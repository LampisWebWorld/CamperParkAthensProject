// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { UserService } from '../../services/user.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const userService = inject(UserService);
//     const router = inject(Router);

//     if (userService.user()) {
//         return true
//     }
  
//     return router.navigate(['login'])
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // Get the logged-in user
  const loggedInUser = userService.user();

  // Check if user is logged in
  if (loggedInUser) {
    const requiredRole = route.data?.['role'] as string;

    if (!requiredRole || loggedInUser.role === requiredRole || loggedInUser.role === 'admin') {
      return true;
    }

    console.error(`Access denied - Role required: ${requiredRole}`);
    return router.navigate(['unauthorized']); // Redirect to an unauthorized page or error
  }

  console.error('Access denied - Not logged in');
  return router.navigate(['login']);
};
