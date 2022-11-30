import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  nombreEquipo: string = '';
  categoriaEquipo: string = '';
  institucionEquipo: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  submit() {
    console.log(
      "Nombre: " + this.nombreEquipo
      + "Institucion: " + this.institucionEquipo
      + "Categoria: " + this.categoriaEquipo
    );
  }
  setCategoria(cat: string) {
    this.categoriaEquipo = cat;
  }
}
