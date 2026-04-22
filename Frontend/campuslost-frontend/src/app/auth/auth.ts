import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const auth: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // SSR/prerender: no sessionStorage, so don't force redirect here.
  // The browser-side guard will run after hydration.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (auth.estaLogueado()) {
    return true;
  }

  return router.parseUrl('/');
};