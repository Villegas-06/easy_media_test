import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!!localStorage.getItem('token') && !!localStorage.getItem('user')) {
      return true; // El usuario está autenticado
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      return this.router.createUrlTree(['/login']);
    }
  }
}
