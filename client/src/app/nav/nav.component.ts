import { User } from './../_models/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = { "username": "Administrador", "password": "123456" }
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToHome(): void {
    this.router.navigate(['/', '']);
  }
  goToEquipos(): void {
    this.router.navigate(['/', 'equipos']);
  }
  goToIntegrantes(): void {
    this.router.navigate(['/', 'integrantes']);
  }
  goToEventos(): void {
    this.router.navigate(['/', 'eventos']);
  }
  goToJurados(): void {
    this.router.navigate(['/', 'jurados']);
  }
  goToEvaluacion(): void {
    this.router.navigate(['/', 'evaluacion']);
  }

  logout(): void {
    localStorage.removeItem('rol');
  }

  isRol(id: number): boolean {
    return localStorage.getItem('rol') == id.toString();
  }

}
