import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RolDto {
  idRol?: number;
  nombre: string;

  // Backends a veces envían snake_case
  id_rol?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/roles';

  crear(rol: RolDto): Observable<RolDto> {
    return this.http.post<RolDto>(this.baseUrl, rol);
  }

  listar(): Observable<RolDto[]> {
    return this.http.get<RolDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<RolDto> {
    return this.http.get<RolDto>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, rol: RolDto): Observable<RolDto> {
    return this.http.put<RolDto>(`${this.baseUrl}/${id}`, rol);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
