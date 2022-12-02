import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  calf_total: any = 0;
  prog: any = "Programacion";
  constr: any = "Construccion";
  dise: any = "Diseño";
  constructor() { }

  ngOnInit(): void {
  }

  onChangeEvent(event: any) {
    console.log(event.target.value);
    if (event.target.value < 0 || event.target.value > 10) {
      if (event.target == document.getElementById("prog")) {
        if (event.target.value < 0) {
          this.prog = 0;
        } else {
          this.prog = 10;
        }

      } else if (event.target == document.getElementById("constr")) {
        if (event.target.value < 0) {
          this.constr = 0;
        } else {
          this.constr = 10;
        }
      } else if (event.target == document.getElementById("dise")) {
        if (event.target.value < 0) {
          this.dise = 0;
        } else {
          this.dise = 10;
        }
      }
    }
    if (this.dise >= 0 && this.prog >= 0 && this.constr >= 0) {
      this.calf_total = (this.dise + this.prog + this.constr);
    } else {

    }

  }
}
