import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCursoComponent } from './nuevo-curso.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NuevoCursoComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    NuevoCursoComponent
  ],
  providers:[
    MessageService, ConfirmationService, AlertService, CursosManagmentService
  ]
})
export class NuevoCursoModule { }
