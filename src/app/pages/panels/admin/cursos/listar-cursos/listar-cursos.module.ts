import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarCursosRoutingModule } from './listar-cursos-routing.module';
import { ListarCursosComponent } from './listar-cursos.component';


@NgModule({
  declarations: [
    ListarCursosComponent
  ],
  imports: [
    CommonModule,
    ListarCursosRoutingModule
  ]
})
export class ListarCursosModule { }
