
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  baseUrl = 'https://localhost:7245/api/';

  constructor(private http: HttpClient) { }

  getEquipos() {
    return this.http.get(this.baseUrl + 'equipos');
  }

}
