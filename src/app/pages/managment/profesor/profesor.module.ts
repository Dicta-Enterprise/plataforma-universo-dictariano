import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';



@NgModule({
  declarations: [
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule
  ]
})
export class ProfesorModule { }
