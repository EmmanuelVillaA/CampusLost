import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ObjetoDto } from '../dto/objetoDTO';

@Injectable({
  providedIn: 'root',
})
export class ObjetoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/objetos';

  crear(objeto: ObjetoDto): Observable<ObjetoDto> {
    return this.http.post<ObjetoDto>(this.baseUrl, objeto);
  }

  listar(): Observable<ObjetoDto[]> {
    return this.http.get<ObjetoDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<ObjetoDto> {
    return this.http.get<ObjetoDto>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, objeto: ObjetoDto): Observable<ObjetoDto> {
    return this.http.put<ObjetoDto>(`${this.baseUrl}/${id}`, objeto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
