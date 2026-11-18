import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisCursosRoutingModule } from './mis-cursos-routing.module';
import { MisCursosComponent } from './mis-cursos.component';


@NgModule({
  declarations: [
    MisCursosComponent
  ],
  imports: [
    CommonModule,
    MisCursosRoutingModule
  ]
})
export class MisCursosModule { }
