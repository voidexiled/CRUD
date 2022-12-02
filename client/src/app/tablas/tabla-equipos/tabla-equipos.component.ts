import { Actions } from './../../_enums/Actions';
import { EquipoService } from './../../_services/equipo.service';
import { Evento } from './../../_models/Evento';
import { Equipo } from './../../_models/Equipo';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorias } from 'src/app/_enums/Categorias';


@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})

export class TablaEquiposComponent implements OnInit {
  @Output() id = new EventEmitter<number>();
  @Output() act = new EventEmitter<number>();;
  //@Input() id = -1;

  datos: Equipo[] = [];
  datoss = JSON.parse(JSON.stringify(""));

  constructor(private equipoService: EquipoService) {

  }

  setEditMode(id: any) {
    this.id.emit(id);
    this.act.emit(Actions.EDIT_MODE);
  }

  setDeleteMode(id: any) {
    this.id.emit(id)
    this.act.emit(Actions.DELETE_MODE)
  }

  getCategoria(id: number): string {
    switch (id) {
      case Categorias.PRIMARIA:
        return "Primaria";
      case Categorias.SECUNDARIA:
        return "Secundaria";
      case Categorias.BACHILLERATO:
        return "Bachillerato";
      case Categorias.PROFESIONAL:
        return "Profesional";
    }
    return "";
  }
  ngOnInit(): void {
    this.equipoService.getEquipos().subscribe((data: any) => {
      this.datoss = data; console.log(data);
      data.forEach((element: any) => {
        this.datos.push(
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
    console.log(this.datos);
  }

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
