import { HttpClient } from '@angular/common/http';
import { Integrante } from './../../_models/Integrante';
import { Component, OnInit } from '@angular/core';
import { IntegranteService } from 'src/app/_services/integrante.service';
import { EquipoService } from 'src/app/_services/equipo.service';


@Component({
  selector: 'app-tabla-integrantes',
  templateUrl: './tabla-integrantes.component.html',
  styleUrls: ['./tabla-integrantes.component.css']
})
export class TablaIntegrantesComponent implements OnInit {
  datos: Integrante[] = [];
  datoss = JSON.parse(JSON.stringify(""));
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
            Equipo_id: element.equipo,
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
}
