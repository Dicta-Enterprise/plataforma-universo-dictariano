import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoIdiomaComponent } from './nuevo-idioma.component';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasService } from 'src/app/core/services/models/galaxias/galaxias.service';



@NgModule({
  declarations: [
    NuevoIdiomaComponent
  ],
  imports: [
    CommonModule,
    ModelsPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NuevoIdiomaComponent
  ],
  providers: [
    MessageService, ConfirmationService, AlertService, GalaxiasService
  ]
})
export class NuevoIdiomaModule { }
