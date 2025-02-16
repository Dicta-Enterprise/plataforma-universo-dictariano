import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { NuevoCursoModule } from "../../../core/components/managment/mantenedores/nuevo-curso/nuevo-curso.module";



@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NuevoCursoModule
],
  providers:[
    MessageService, ConfirmationService, CursosManagmentService
  ]
})
export class CursosModule { }
