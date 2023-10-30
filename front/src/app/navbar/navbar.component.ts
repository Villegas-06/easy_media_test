import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    // Verificar si la ruta actual es "login" o "register"
    return !['/login', '/register'].includes(currentRoute);
  }
}
