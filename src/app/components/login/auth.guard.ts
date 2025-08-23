import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
if (user) {
  return true;
}


      this.router.navigate(['/login']);
      return false;
    }

    // Si ce n'est pas le navigateur (SSR), ne rien faire
    return false;
  }
}

