import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaLandingComponent } from './nueva-landing.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageManagmentService } from '../../../../services/managment/landing-page/landing-managment.service';
import { ChipsModule } from 'primeng/chips';



@NgModule({
  declarations: [
    NuevaLandingComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    ChipsModule
  ],
  exports: [
    NuevaLandingComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AlertService,
    LandingPageManagmentService
  ]
})
export class NuevaLandingModule { }
