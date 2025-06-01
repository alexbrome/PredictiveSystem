import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../auth/services/storage.service';
import { inject } from '@angular/core';

export const routeAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
   return StorageService.isAdminLoggedIn()
    ? true
    : router.parseUrl('/unauthorized');
};
