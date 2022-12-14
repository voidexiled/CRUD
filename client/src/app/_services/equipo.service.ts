import { Equipo } from './../_models/Equipo';
import { map, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  baseUrl = 'https://localhost:7245/api/equipos';

  constructor(private http: HttpClient) { }

  getEquipos() {
    return this.http.get(this.baseUrl);
  }
  getEquipoById(id: number) {
    return this.http.get(this.baseUrl + '/' + id);
  }
  getEquipoByName(name: string) {
    return this.http.get(this.baseUrl + '/nombre/' + name);
  }

  getEquiposByCategory(id: number) {
    return this.http.get(this.baseUrl + '/categoria/' + id);
  }
  createEquipo(model: Equipo) {
    return this.http.post(this.baseUrl, model).pipe(
      map((response: any) => {
        const evento = response;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  updateEquipo(model: Equipo) {

    return this.http.put(this.baseUrl + '/', model).pipe(
      map(() => {
        const evento = model;
        if (evento) {
          console.log(evento);
        }
      })
    )
  }

  deleteEquipo(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }


}
