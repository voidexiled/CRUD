import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router) {
    if (localStorage.getItem('rol') != null) {
      router.navigate(['/home']);
    } else {

    }

  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  sessionExists() {
    return localStorage.getItem('rol') != null;
  }
}
