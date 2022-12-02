import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { EquiposComponent } from './equipos/equipos.component';
import { IntegrantesComponent } from './integrantes/integrantes.component';
import { EventosComponent } from './eventos/eventos.component';
import { JuradosComponent } from './jurados/jurados.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaEquiposComponent } from './tablas/tabla-equipos/tabla-equipos.component';
import { TablaIntegrantesComponent } from './tablas/tabla-integrantes/tabla-integrantes.component';
import { TablaEventosComponent } from './tablas/tabla-eventos/tabla-eventos.component';
import { TablaJuradosComponent } from './tablas/tabla-jurados/tabla-jurados.component';
import { LoginComponent } from './login/login.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    EquiposComponent,
    IntegrantesComponent,
    EventosComponent,
    JuradosComponent,
    TablaEquiposComponent,
    TablaIntegrantesComponent,
    TablaEventosComponent,
    TablaJuradosComponent,
    LoginComponent,
    EvaluacionComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
