import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCursoComponent } from './nuevo-curso.component';
import { ModelsPrimengModule } from 'src/app/core/themes/models/models-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomDropdownsModule } from 'src/app/core/widgets/dropdowns/custom-dropdowns.module';


@NgModule({
  declarations: [
    NuevoCursoComponent
  ],
  imports: [
    CommonModule,
    ModelsPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomDropdownsModule,
    FormsModule,
],
  exports:[
    NuevoCursoComponent
  ],
  providers:[
    MessageService, ConfirmationService, AlertService, CursosService
  ]
})
export class NuevoCursoModule { }
