import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EventoService {
  baseUrl = 'https://localhost:7245/api/eventos';
  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get(this.baseUrl);
  }

  getEventoById(id_evento: number) {
    return this.http.get(this.baseUrl + '/' + id_evento);
  }

  getEventoByName(name: string) {
    return this.http.get(this.baseUrl + '/nombre/' + name);
  }

  createEvento(model: any) {
    return this.http.post(this.baseUrl, model).pipe(
      map((response: any) => {
        const evento = response;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  updateEvento(model: any) {
    console.log(model);
    return this.http.put(this.baseUrl + '/', model).pipe(
      map((response: any) => {
        const evento = response;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  deleteEvento(id_evento: number) {
    return this.http.delete(this.baseUrl + '/' + id_evento);
  }
}
