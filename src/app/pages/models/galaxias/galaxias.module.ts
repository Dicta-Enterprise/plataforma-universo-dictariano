import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalaxiasComponent } from './galaxias.component';
import { GalaxiasRoutingModule } from './galaxias-routing.module';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { SharedMantenedoresModule } from 'src/app/core/components/models/mantenedores/shared-mantenedores.module';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [GalaxiasComponent],
  imports: [
    CommonModule,
    GalaxiasRoutingModule,
    ModelsPrimengModule,
    SharedSpinnerModule,
    SharedMantenedoresModule,
    SharedDirectiveModule,
    ConfirmDialogModule,
    ChipModule,
  ],
  providers: [MessageService, ConfirmationService, AlertService],
})
export class GalaxiasModule {}
