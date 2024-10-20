import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoCursoRoutingModule } from './nuevo-curso-routing.module';
import { NuevoCursoComponent } from './nuevo-curso.component';
import { AdminPrimengModule } from 'src/app/core/themes/admin/admin-primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';


@NgModule({
  declarations: [
    NuevoCursoComponent
  ],
  imports: [
    CommonModule,
    NuevoCursoRoutingModule,
    AdminPrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService, MessageService, AlertService
  ]
})
export class NuevoCursoModule { }
