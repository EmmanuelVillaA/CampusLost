import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8080/api/auth';

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  guardarSesion(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerSesion(): any {
    return localStorage.getItem('usuario');
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('usuario');
  }

}