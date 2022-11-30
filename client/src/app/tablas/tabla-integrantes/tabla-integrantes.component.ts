import { HttpClient } from '@angular/common/http';
import { Integrante } from './../../_models/Integrante';
import { Component, OnInit } from '@angular/core';


const DATOS: Integrante[] = [
  {
    Nombre: 'Nombre1',
    Apellido1: 'Apellido1',
    Apellido2: 'Apellido2',
    CURP: 'Curp',
    Equipo: 'Equipo1',
    Edad: 10
  },
  {
    Nombre: 'Nombre1',
    Apellido1: 'Apellido1',
    Apellido2: 'Apellido2',
    CURP: 'Curp',
    Equipo: 'Equipo1',
    Edad: 11
  },
];

@Component({
  selector: 'app-tabla-integrantes',
  templateUrl: './tabla-integrantes.component.html',
  styleUrls: ['./tabla-integrantes.component.css']
})
export class TablaIntegrantesComponent implements OnInit {
  datos = DATOS;
  constructor() {

  }

  ngOnInit(): void {

  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
