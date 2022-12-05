import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IntegranteService {
  baseUrl = 'https://localhost:7245/api/integrantes';
  constructor(private httpClient: HttpClient) { }

  getIntegrantes() {
    return this.httpClient.get(this.baseUrl);
  }

  getIntegranteById(id: string) {
    return this.httpClient.get(this.baseUrl + '/' + id);
  }
  getIntegrantesByEquipo(id: number) {
    return this.httpClient.get(this.baseUrl + '/equipo/' + id);
  }


  createIntegrante(model: any) {
    return this.httpClient.post(this.baseUrl, model).pipe(
      map((response: any) => {
        const evento = response;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  updateIntegrante(model: any) {
    return this.httpClient.put(this.baseUrl + '/', model).pipe(
      map(() => {
        const evento = model;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  deleteIntegrante(id: string) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }


}
