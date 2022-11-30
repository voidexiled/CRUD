import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Roles } from '../_enums/Roles';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rol: number = -1;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginAs(rol: number) {
    if (rol > -1 && rol < 3) {
      localStorage.setItem('rol', rol.toString());

    }


  }

  getRol() {
    return this.rol;
  }
  setRol(rol: number) {
    this.rol = rol;
  }

}

