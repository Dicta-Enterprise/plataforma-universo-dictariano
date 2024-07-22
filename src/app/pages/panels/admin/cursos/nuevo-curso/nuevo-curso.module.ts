import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoCursoRoutingModule } from './nuevo-curso-routing.module';
import { NuevoCursoComponent } from './nuevo-curso.component';
import { AdminPrimengModule } from 'src/app/core/themes/admin/admin-primeng.module';


@NgModule({
  declarations: [
    NuevoCursoComponent
  ],
  imports: [
    CommonModule,
    NuevoCursoRoutingModule,
    AdminPrimengModule
  ]
})
export class NuevoCursoModule { }
