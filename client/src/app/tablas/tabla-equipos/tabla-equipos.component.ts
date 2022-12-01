import { EquipoService } from './../../_services/equipo.service';
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
  datos: Equipo[] = [];
  datoss = JSON.parse(JSON.stringify(""));

  constructor(private equipoService: EquipoService) {

  }



  ngOnInit(): void {
    this.equipoService.getEquipos().subscribe((data: any) => {
      this.datoss = data; console.log(data);
      data.forEach((element: any) => {
        this.datos.push(
          {
            Nombre: element.nombre,
            Institucion: element.institucion,
            Categoria: element.categoria
          }
        );
      }
      );
    });
    console.log(this.datos);
  }

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
