import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployedRoutingModule } from './employed-routing.module';
import { EmployedComponent } from './employed.component';


@NgModule({
  declarations: [
    EmployedComponent
  ],
  imports: [
    CommonModule,
    EmployedRoutingModule
  ]
})
export class EmployedModule { }
