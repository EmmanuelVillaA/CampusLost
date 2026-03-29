import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstadoDto {
  idEstado?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/estados';

  crear(estado: EstadoDto): Observable<EstadoDto> {
    return this.http.post<EstadoDto>(this.baseUrl, estado);
  }

  listar(): Observable<EstadoDto[]> {
    return this.http.get<EstadoDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<EstadoDto> {
    return this.http.get<EstadoDto>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, estado: EstadoDto): Observable<EstadoDto> {
    return this.http.put<EstadoDto>(`${this.baseUrl}/${id}`, estado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
