import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaGalaxiaComponent } from './nueva-galaxia.component';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasService } from '../../../../services/models/galaxias/galaxias.service';
import { CustomDropdownsModule } from 'src/app/core/widgets/dropdowns/custom-dropdowns.module';



@NgModule({
  declarations: [
    NuevaGalaxiaComponent
  ],
  imports: [
    CommonModule,
    ModelsPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    CustomDropdownsModule
  ],
  exports: [
    NuevaGalaxiaComponent
  ],
  providers: [
    MessageService, ConfirmationService, AlertService, GalaxiasService
  ]
})
export class NuevaGalaxiaModule { }
