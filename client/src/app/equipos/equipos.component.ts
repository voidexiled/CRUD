import { Titles } from './../_enums/Titles';
import { Actions } from './../_enums/Actions';
import { Evento } from './../_models/Evento';
import { Categorias } from './../_enums/Categorias';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EquipoService } from '../_services/equipo.service';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  id = 2;

  action = Actions.REGISTER_MODE;
  title: string = Titles.REGISTER_MODE + 'Equipo';
  nombreEquipo: string = '';
  categoriaEquipo: string = '';
  institucionEquipo: string = '';
  eventoEquipo: string = '';
  eventos: Evento[] = [];

  constructor(private equipoService: EquipoService, private eventoService: EventoService) {
    this.fillTable();

  }

  fillTable() {
    this.eventoService.getEventos().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.eventos.push(
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
  }

  ngOnInit(): void {
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


  //validate not empty variables and send to service
  submitEquipo() {
    if (this.nombreEquipo == '' || this.institucionEquipo == '' || this.categoriaEquipo == '' || this.eventoEquipo == '') {
      alert("Llenar todos los campos");
    } else {
      switch (this.action) {
        case Actions.REGISTER_MODE:
          this.submit();
          break;
        case Actions.EDIT_MODE:
          this.editSubmit();
          break;
        default: break;

      }
    }


  }

  //Submit edited information to api using service
  editSubmit() {
    this.equipoService.updateEquipo({ Id_equipo: this.id, Nombre: this.nombreEquipo, Institucion: this.institucionEquipo, Evento: this.eventoEquipo, Categoria: parseInt(this.categoriaEquipo) }).subscribe((data: any) => {
      console.log(data);

    }
    );
  }


  submit() {
    var cat = -1;
    this.categoriaEquipo = this.categoriaEquipo.trimStart().trimEnd().toLowerCase();
    switch (this.categoriaEquipo) {

      case 'primaria':
        cat = Categorias.PRIMARIA;
        break;
      case 'secundaria':
        cat = Categorias.SECUNDARIA;
        break;
      case 'bachillerato':
        cat = Categorias.BACHILLERATO;
        break;
      case 'profesional':
        cat = Categorias.PROFESIONAL;
        break;
    }
    this.equipoService.createEquipo({ Nombre: this.nombreEquipo, Institucion: this.institucionEquipo, Evento: this.eventoEquipo, Categoria: cat })
      .subscribe(response => {
        console.log(response);

      }, error => {
        alert("Error al crear equipo");
        console.log(error);
      });
  }
  setCategoria(cat: string) {
    this.categoriaEquipo = cat;
  }

  setEvento(evento: string) {
    this.eventoEquipo = evento;
  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }

  setEdit(equipo_id: number) {
    this.action = Actions.EDIT_MODE;
    this.title = Titles.EDIT_MODE + 'Equipo';
    this.equipoService.getEquipoById(equipo_id).subscribe((data: any) => {
      this.id = data.id_equipo;
      this.nombreEquipo = data.nombre;
      this.institucionEquipo = data.institucion;
      this.eventoEquipo = data.evento;
      this.categoriaEquipo = data.categoria;
    });
  }

}
