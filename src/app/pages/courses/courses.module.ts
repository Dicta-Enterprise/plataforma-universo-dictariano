import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [
    CursosManagmentService, MessageService, ConfirmationService, AlertService
  ]
})
export class CoursesModule { }
