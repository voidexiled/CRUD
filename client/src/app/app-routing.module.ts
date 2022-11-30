import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrantesComponent } from './integrantes/integrantes.component';
import { EventosComponent } from './eventos/eventos.component';
import { JuradosComponent } from './jurados/jurados.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'integrantes', component: IntegrantesComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'jurados', component: JuradosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
