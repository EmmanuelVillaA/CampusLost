import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  adminOpen = false;

  toggleAdmin() { this.adminOpen = !this.adminOpen; }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-dropdown')) {
      this.adminOpen = false;
    }
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}