import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { CursosNinosComponent } from './cursos-ninos.component';
import { CursosNinosRoutingModule } from './cursos-ninos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ CursosNinosComponent ],
  imports: [
    CommonModule,
    SharedModule,
    CursosNinosRoutingModule
  ]
})
export class CursosNinosModule { }