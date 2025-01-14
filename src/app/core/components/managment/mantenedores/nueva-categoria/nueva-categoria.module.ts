import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCategoriaComponent } from './nueva-categoria.component';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';



@NgModule({
  declarations: [
    NuevaCategoriaComponent
  ],
  imports: [
    CommonModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule
  ],
  exports:[
    NuevaCategoriaComponent
  ],
  providers:[
    MessageService, ConfirmationService, AlertService
  ]
})
export class NuevaCategoriaModule { }
