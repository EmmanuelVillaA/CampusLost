import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class inicio {
  mostrarConfirmCerrarSesion = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  abrirConfirmCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = true;
  }

  cancelarCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = false;
  }

  confirmarCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = false;
    this.authService.cerrarSesion();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
