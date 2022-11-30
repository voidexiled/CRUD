import { Categorias } from './../_enums/Categorias';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {
  equipos: any = []
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  curp: string = '';
  edad: number = 0;
  equipo: string = '';
  edades: any = [];

  categoriaCorrespondiente: number = -1;



  constructor() {

  }

  ngOnInit(): void {
    for (let i = 0; i < 80; i++) {
      this.edades[i] = i + 1
    }
  }

  getEquipos(): void {

  }
  setEquipo(equipo: string): void {
    this.equipo = equipo;
  }

  setEdad(edad: number): void {
    this.edad = edad;
    if (edad > 7) {
      if (this.edad > 7 && this.edad < 12) { // PRIMARIA
        this.categoriaCorrespondiente = Categorias.PRIMARIA;
      } else if (this.edad > 12 && this.edad < 16) { // SECUNDARIA
        this.categoriaCorrespondiente = Categorias.SECUNDARIA;
      } else if (this.edad > 16 && this.edad < 19) { // BACHILLERATO
        this.categoriaCorrespondiente = Categorias.BACHILLERATO;
      } else if (this.edad > 19) { // PROFESIONAL
        this.categoriaCorrespondiente = Categorias.PROFESIONAL;
      }
    } else {
      this.categoriaCorrespondiente = Categorias.SIN_CATEGORIA;
    }


  }

  submit(): void {
    console.log(
      "Nombre: " + this.nombre.trimStart().trimEnd() + " " + this.apellido1.trimStart().trimEnd() + " " + this.apellido2.trimStart().trimEnd()
      + "CURP: " + this.curp
      + "Edad: " + this.edad
      + "Equipo: " + this.equipo
      + "Categoria Correspondiente: " + this.categoriaCorrespondiente
    );
  }
}
