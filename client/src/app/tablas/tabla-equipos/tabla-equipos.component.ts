import { Evento } from './../../_models/Evento';
import { Equipo } from './../../_models/Equipo';
import { Component, OnInit } from '@angular/core';


const DATOS: Equipo[] = [
  {
    Nombre: 'Equipo1',
    Institucion: 'Institucion1',
    Categoria: 1,
  },
  {
    Nombre: 'Equipo2',
    Institucion: 'Institucion2',
    Categoria: 2,
  },
];

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent implements OnInit {
  datos = DATOS;

  constructor() {

  }

  ngOnInit(): void {

  }

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
