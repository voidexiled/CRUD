import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  model: NgbDateStruct | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }
}
