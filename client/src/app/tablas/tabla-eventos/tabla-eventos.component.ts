import { Evento } from './../../_models/Evento';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventoService } from 'src/app/_services/evento.service';
import { Actions } from 'src/app/_enums/Actions';

@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})
export class TablaEventosComponent implements OnInit {
  @Output() id = new EventEmitter<number>();
  @Output() act = new EventEmitter<number>();

  datos: Evento[] = [];
  datoss = JSON.parse(JSON.stringify(""));

  setEditMode(id: any) {
    this.id.emit(id);
    this.act.emit(Actions.EDIT_MODE);
  }

  setDeleteMode(id: any) {
    this.id.emit(id)

    this.deleteEvento(id)
  }

  deleteEvento(id: number) {
    this.eventoService.deleteEvento(id).subscribe((data: any) => {
      console.log(data);
      alert("Evento eliminado");

    }, err => alert("Error al eliminar evento"));
  }
  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe((data: any) => {
      this.datoss = data; console.log(data);
      data.forEach((element: any) => {
        this.datos.push(
          {
            Id_evento: element.id_evento,
            Sede: element.sede,
            Fecha: element.fecha,
            Nombre: element.nombre
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
