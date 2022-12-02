import { Equipo } from './../../_models/Equipo';
import { HttpClient } from '@angular/common/http';
import { Integrante } from './../../_models/Integrante';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IntegranteService } from 'src/app/_services/integrante.service';
import { EquipoService } from 'src/app/_services/equipo.service';
import { Actions } from 'src/app/_enums/Actions';


@Component({
  selector: 'app-tabla-integrantes',
  templateUrl: './tabla-integrantes.component.html',
  styleUrls: ['./tabla-integrantes.component.css']
})
export class TablaIntegrantesComponent implements OnInit {
  @Output() id = new EventEmitter<string>();
  @Output() act = new EventEmitter<number>();;
  datos: Integrante[] = [];
  datoss = JSON.parse(JSON.stringify(""));


  setEditMode(id: any) {
    this.id.emit(id);
    this.act.emit(Actions.EDIT_MODE);
  }

  setDeleteMode(id: any) {
    this.id.emit(id)

    this.deleteIntegrante(id)
  }


  constructor(private integranteService: IntegranteService, private equipoService: EquipoService) {
    this.integranteService.getIntegrantes().subscribe((data: any) => {
      this.datoss = data; console.log(data);

      data.forEach((element: any) => {

        this.datos.push(
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
    console.log(this.datos);

  }


  ngOnInit(): void {

  }

  getEquipo(id: number) {
    this.equipoService.getEquipoById(id).subscribe((data: any) => {
      return data.nombre;
    }).unsubscribe();
  }

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }

  deleteIntegrante(id: string) {
    this.integranteService.deleteIntegrante(id).subscribe((data: any) => {
      console.log(data);
      alert("Integrante eliminado");

    }, err => alert("Error al eliminar integrante"));
  }
}
