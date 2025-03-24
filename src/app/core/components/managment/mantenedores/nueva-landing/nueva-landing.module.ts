import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaLandingComponent } from './nueva-landing.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageManagmentService } from '../../../../services/managment/landing-page/landing-managment.service';
import { ChipsModule } from 'primeng/chips';
import { ChipEditorComponent } from './components/chip-editor/chip-editor/chip-editor.component';



@NgModule({
  declarations: [
    NuevaLandingComponent,
    ChipEditorComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    ChipsModule,
    FormsModule
  ],
  exports: [
    NuevaLandingComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AlertService,
    LandingPageManagmentService,
  ]
})
export class NuevaLandingModule { }
