import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarCursosRoutingModule } from './listar-cursos-routing.module';
import { ListarCursosComponent } from './listar-cursos.component';
import { AdminPrimengModule } from 'src/app/core/themes/admin/admin-primeng.module';


@NgModule({
  declarations: [
    ListarCursosComponent
  ],
  imports: [
    CommonModule,
    ListarCursosRoutingModule,
    AdminPrimengModule,
    
  ]
})
export class ListarCursosModule { }
