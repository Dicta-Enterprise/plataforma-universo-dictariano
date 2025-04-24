import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProfesorComponent } from './nuevo-profesor.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProfesorManagmentService } from 'src/app/core/services/managment/profesor/profesor-managment.service';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [NuevoProfesorComponent],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputMaskModule,
  ],
  exports: [NuevoProfesorComponent],
  providers: [
    MessageService,
    ConfirmationService,
    AlertService,
    ProfesorManagmentService
  ]
})
export class NuevoProfesorModule {}
