import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoIdiomaComponent } from './nuevo-idioma.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasManagmentService } from 'src/app/core/services/managment/galaxias/galaxias-managment.service';



@NgModule({
  declarations: [
    NuevoIdiomaComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NuevoIdiomaComponent
  ],
  providers: [
    MessageService, ConfirmationService, AlertService, GalaxiasManagmentService
  ]
})
export class NuevoIdiomaModule { }
