import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaLandingComponent } from './nueva-landing.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';



@NgModule({
  declarations: [
    NuevaLandingComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [
    NuevaLandingComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AlertService
  ]
})
export class NuevaLandingModule { }
