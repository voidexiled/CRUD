import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jurados',
  templateUrl: './jurados.component.html',
  styleUrls: ['./jurados.component.css']
})
export class JuradosComponent implements OnInit {
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  curp: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  submit(): void {
    console.log(
      "Nombre: " + this.nombre.trimStart().trimEnd() + " " + this.apellido1.trimStart().trimEnd() + " " + this.apellido2.trimStart().trimEnd()
      + "CURP: " + this.curp
    );
  }

}
