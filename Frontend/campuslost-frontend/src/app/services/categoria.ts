import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaDto {
  idCategoria?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/categorias';

  crear(categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.baseUrl, categoria);
  }

  listar(): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<CategoriaDto> {
    return this.http.get<CategoriaDto>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.http.put<CategoriaDto>(`${this.baseUrl}/${id}`, categoria);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
