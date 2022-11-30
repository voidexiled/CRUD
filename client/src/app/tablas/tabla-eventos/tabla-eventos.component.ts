import { Evento } from './../../_models/Evento';
import { Component, OnInit } from '@angular/core';


const DATOS: Evento[] = [
  {
    Sede: 'Lugar1',
    Fecha: '11-11-1111',
    Nombre: 'Evento1',
  },
  {
    Sede: 'Lugar2',
    Fecha: '22-22-2222',
    Nombre: 'Evento2',
  },
];

@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})
export class TablaEventosComponent implements OnInit {
  datos = DATOS;

  constructor() {

  }

  ngOnInit(): void {

  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }


}
