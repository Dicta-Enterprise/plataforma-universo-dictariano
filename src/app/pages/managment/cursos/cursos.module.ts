import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { ManagmentPrimengModule } from 'src/app/core/themes/managment/managment-primeng.module';
import { SharedSpinnerModule } from 'src/app/shared/components/spinners/shared-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { NuevoCursoModule } from "../../../core/components/managment/mantenedores/nuevo-curso/nuevo-curso.module";
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { SharedPipeModule } from 'src/app/shared/pipes/shared-pipe.module';
import { CustomDropdownsModule } from 'src/app/core/widgets/dropdowns/custom-dropdowns.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ManagmentPrimengModule,
    SharedSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NuevoCursoModule,
    ConfirmDialogModule,
    SharedDirectiveModule,
    SharedPipeModule,
    FormsModule,
    CustomDropdownsModule,
    TableModule
  ],
  providers: [
    MessageService, ConfirmationService, CursosManagmentService, AlertService
  ]
})
export class CursosModule { }
