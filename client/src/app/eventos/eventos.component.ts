import { Evento } from './../_models/Evento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Actions } from '../_enums/Actions';
import { Titles } from '../_enums/Titles';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  id: number = 0;
  model: NgbDateStruct | undefined;
  nombre: string = '';
  sede: string = '';
  fecha: string = '';
  action = Actions.REGISTER_MODE;
  title: string = Titles.REGISTER_MODE + 'Evento';


  constructor(private eventosService: EventoService) { }

  ngOnInit(): void {
  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }


  submit(): void {
    this.validate();
  }
  //validate variables not empty and send
  validate(): void {
    switch (this.action) {
      case Actions.REGISTER_MODE:
        if (this.nombre != '' && this.sede != '' && this.model?.year.toString() != '' && this.model?.month.toString() != '' && this.model?.day.toString() != '') {
          this.send();
        } else {
          alert('Por favor rellena la información');
        }
        break;
      case Actions.EDIT_MODE:
        if (this.nombre != '' && this.sede != '' && this.model?.year.toString() != '' && this.model?.month.toString() != '' && this.model?.day.toString() != '') {
          this.sendEdit();
        }
    }
  }

  sendEdit(): void {
    let dataa: Evento = {
      Id_evento: this.id,
      Nombre: this.nombre,
      Sede: this.sede,
      Fecha: this.model?.year + '-' + this.model?.month + '-' + this.model?.day
    }
    console.log(dataa);
    this.eventosService.updateEvento(dataa).subscribe((data: any) => {
      console.log(data);
      alert("Evento editado.");
    }, err => alert("Error: " + err));
  }
  //send data to api using service
  send(): void {
    let dataa: Evento = {
      Nombre: this.nombre,
      Sede: this.sede,
      Fecha: this.model?.year + '-' + this.model?.month + '-' + this.model?.day
    }
    console.log(dataa);
    this.eventosService.createEvento(dataa).subscribe((data: any) => {
      console.log(data);
      alert("Evento creado.");
    }, err => alert("Error: Ya existe un evento con el mismo nombre"));
  }

  setId(id: number) {
    this.id = id;
    if (this.action == Actions.EDIT_MODE) {
      this.setEdit(this.id);
    }
  }
  setMode(mode: number) {
    this.action = mode;
    if (this.id > 0 && this.action == Actions.EDIT_MODE) {
      this.setEdit(this.id);
    }
  }
  setEdit(id_evento: number) {

    this.action = Actions.EDIT_MODE;
    this.title = Titles.EDIT_MODE + 'Evento';
    this.eventosService.getEventoById(id_evento).subscribe((data: any) => {
      let fch = {
        year: parseInt(data.fecha.split('-')[0]),
        month: parseInt(data.fecha.split('-')[1]),
        day: parseInt(data.fecha.split('-')[2])
      }
      this.id = data.id_evento;
      this.sede = data.sede;
      this.nombre = data.nombre;
      this.model = fch
    });
  }
}


