import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { SharedPipeModule } from 'src/app/shared/pipes/shared-pipe.module';
import { NuevoProfesorModule } from 'src/app/core/components/managment/mantenedores/nuevo-profesor/nuevo-profesor.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProfesorManagmentService } from 'src/app/core/services/managment/profesor/profesor-managment.service';



@NgModule({
  declarations: [
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    SharedDirectiveModule,
    SharedPipeModule,
    NuevoProfesorModule
  ],
  providers:[
    MessageService, ConfirmationService, ProfesorManagmentService, AlertService
  ]
})
export class ProfesorModule { }
