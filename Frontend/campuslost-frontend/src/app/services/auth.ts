import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private api = 'http://localhost:8080/api/auth';

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  guardarSesion(usuario: any): void {
    if (!this.isBrowser) return;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerSesion(): any {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem('usuario');
  }

  cerrarSesion(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem('usuario');
  }

  estaLogueado(): boolean {
    if (!this.isBrowser) return false;
    return !!sessionStorage.getItem('usuario');
  }

}