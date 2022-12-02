import { Evento } from './../../_models/Evento';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})
export class TablaEventosComponent implements OnInit {
  datos: Evento[] = [];
  datoss = JSON.parse(JSON.stringify(""));

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
