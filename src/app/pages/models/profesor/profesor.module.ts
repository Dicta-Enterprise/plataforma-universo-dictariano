import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { SharedPipeModule } from 'src/app/shared/pipes/shared-pipe.module';
import { NuevoProfesorModule } from 'src/app/core/components/models/mantenedores/nuevo-profesor/nuevo-profesor.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProfesorService } from 'src/app/core/services/models/profesor/profesor.service';



@NgModule({
  declarations: [
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    ModelsPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    SharedDirectiveModule,
    SharedPipeModule,
    NuevoProfesorModule
  ],
  providers:[
    MessageService, ConfirmationService, ProfesorService, AlertService
  ]
})
export class ProfesorModule { }
