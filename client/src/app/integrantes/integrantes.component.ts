import { Evento } from './../_models/Evento';
import { Equipo } from './../_models/Equipo';
import { IntegranteService } from './../_services/integrante.service';
import { Categorias } from './../_enums/Categorias';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../_services/equipo.service';
import { Integrante } from '../_models/Integrante';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {
  datoss: any = {};
  equipos: Equipo[] = [];
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  curp: string = '';
  edad: number = 0;
  equipo: string = '';
  edades: any = [];
  idEq = 0;

  categoriaCorrespondiente: number = -1;



  constructor(private equiposService: EquipoService, private integrantesService: IntegranteService) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 80; i++) {
      this.edades[i] = i + 1
    }
  }

  getEquipos(): void {

    this.equiposService.getEquiposByCategory(this.categoriaCorrespondiente).subscribe((data: any) => {
      this.datoss = data; console.log(data);
      data.forEach((element: any) => {
        this.equipos.push(
          {
            Id_equipo: element.id_equipo,
            Nombre: element.nombre,
            Institucion: element.institucion,
            Evento: element.evento,
            Categoria: element.categoria
          }
        );
      }
      );
    });
  }

  setEquipo(equipo: string): void {
    this.equipo = equipo;
    this.getCurrentEquipo(equipo);
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
    this.equipos = [];
    this.getEquipos();

  }

  submitIntegrantes() {

    var currentInt: Integrante = {
      CURP: this.curp,
      Nombre: this.nombre,
      Apellido1: this.apellido1,
      Apellido2: this.apellido2,
      Edad: this.edad,
      Equipo_id: this.idEq
    }
    console.log(currentInt);

    this.integrantesService.createIntegrante(currentInt).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
      alert("Error al crear el integrante");
    });

  }


  getCurrentEquipo(eq: string) {
    this.equiposService.getEquipoByName(eq).subscribe((data: any) => {
      console.log(data);
      this.idEq = data.id_equipo;
    });

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

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
