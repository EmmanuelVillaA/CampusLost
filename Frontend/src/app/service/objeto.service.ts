import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Objeto } from '../models/objeto';

@Injectable({ providedIn: 'root' })
export class ObjetoService {

  private api = 'http://localhost:8080/api/objetos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(this.api);
  }

  create(obj: Objeto): Observable<Objeto> {
    return this.http.post<Objeto>(this.api, obj);
  }
}