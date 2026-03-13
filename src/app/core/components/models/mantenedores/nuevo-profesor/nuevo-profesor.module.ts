import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProfesorComponent } from './nuevo-profesor.component';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProfesorService } from 'src/app/core/services/models/profesor/profesor.service';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [NuevoProfesorComponent],
  imports: [
    CommonModule,
    ModelsPrimengModule,
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
    ProfesorService
  ]
})
export class NuevoProfesorModule {}
