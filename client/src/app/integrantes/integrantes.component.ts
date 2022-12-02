import { Titles } from './../_enums/Titles';
import { Evento } from './../_models/Evento';
import { Equipo } from './../_models/Equipo';
import { IntegranteService } from './../_services/integrante.service';
import { Categorias } from './../_enums/Categorias';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../_services/equipo.service';
import { Integrante } from '../_models/Integrante';
import { Actions } from '../_enums/Actions';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  action = Actions.REGISTER_MODE;
  title: string = Titles.REGISTER_MODE + 'Integrante';
  datoss: any = {};
  integrantes: Integrante[] = [];
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
    this.fillTable();
  }

  fillTable() {
    this.integrantesService.getIntegrantes().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.integrantes.push(
          {
            CURP: element.curp,
            Nombre: element.nombre,
            Apellido1: element.apellido1,
            Apellido2: element.apellido2,
            Edad: element.edad,
            Equipo: element.equipo,
          }
        );
      }
      );
    });
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

  setEdit(curp: string) {
    this.action = Actions.EDIT_MODE;
    this.title = Titles.EDIT_MODE + 'iNTEGRANTE';
    this.integrantesService.getIntegranteById(curp).subscribe((data: any) => {
      this.curp = data.curp;
      this.nombre = data.nombre;
      this.apellido1 = data.apellido1;
      this.apellido2 = data.apellido2;
      this.edad = data.edad;
      this.equipo = data.equipo;
    });
  }
  setId(id: string) {
    this.curp = id;
    if (this.action == Actions.EDIT_MODE) {
      this.setEdit(this.curp);
    }
  }
  setMode(mode: number) {
    this.action = mode;
    if (this.validateCurp(this.curp) && this.action == Actions.EDIT_MODE) {
      this.setEdit(this.curp);
    }
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
      Equipo: this.idEq
    }
    if (this.action == Actions.REGISTER_MODE) {
      this.integrantesService.createIntegrante(currentInt).subscribe((data: any) => {
        console.log(data);
        alert("Integrante registrado correctamente");
      }, error => {
        console.log(error);
        alert("Error al registrar el integrante");
      });
    } else if (this.action == Actions.EDIT_MODE) {
      this.integrantesService.updateIntegrante(currentInt).subscribe((data: any) => {
        console.log(data);
        alert("Integrante actualizado correctamente");
      }, error => {
        console.log(error);
        alert("Error al actualizar el integrante");
      });
    }
    // validate not empty variables



  }
  // Validate a string as CURP (Mexican ID)
  validateCurp(curp: string): boolean {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
      return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17: string) {
      //Fuente https://consultas.curp.gob.mx/CurpSP/
      var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma = 0.0,
        lngDigito = 0.0;
      for (var i = 0; i < 17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
      lngDigito = 10 - lngSuma % 10;
      if (lngDigito == 10) return 0;
      return lngDigito.toString();
    }

    if (validado[2] != digitoVerificador(validado[1]))
      return false;

    return true; //Validado
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
