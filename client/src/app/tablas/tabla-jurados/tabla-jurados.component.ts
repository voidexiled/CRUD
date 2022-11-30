import { Component, OnInit } from '@angular/core';
import { Jurado } from '../../_models/Jurado';


const DATOS: Jurado[] = [
  {
    Nombre: 'Nombre1',
    Apellido1: 'Apellido1',
    Apellido2: 'Apellido2',
    CURP: 'Curp1',
    Contrasena: ''
  },
  {
    Nombre: 'Nombre1',
    Apellido1: 'Apellido1',
    Apellido2: 'Apellido2',
    CURP: 'Curp2',
    Contrasena: ''
  },
];
@Component({
  selector: 'app-tabla-jurados',
  templateUrl: './tabla-jurados.component.html',
  styleUrls: ['./tabla-jurados.component.css']
})
export class TablaJuradosComponent implements OnInit {
  datos = DATOS;
  constructor() { }

  ngOnInit(): void {
  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
