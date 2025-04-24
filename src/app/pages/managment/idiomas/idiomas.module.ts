import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiomasComponent } from './idiomas.component';
import { IdiomasRoutingModule } from './idiomas-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { SharedMantenedoresModule } from 'src/app/core/components/managment/mantenedores/shared-mantenedores.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';



@NgModule({
  declarations: [
    IdiomasComponent
  ],
  imports: [
    CommonModule,
    IdiomasRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    SharedMantenedoresModule,
    SharedDirectiveModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AlertService
  ]
})
export class IdiomasModule { }
