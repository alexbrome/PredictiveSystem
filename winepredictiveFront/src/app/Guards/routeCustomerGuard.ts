import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../auth/services/storage.service';
import { inject } from '@angular/core';

export const routeCustomerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
   return StorageService.isCustomerLoggedIn()
    ? true
    : router.parseUrl('/unauthorized');
};