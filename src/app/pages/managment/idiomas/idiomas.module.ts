import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiomasComponent } from './idiomas.component';
import { IdiomasRoutingModule } from './idiomas-routing.module';



@NgModule({
  declarations: [
    IdiomasComponent
  ],
  imports: [
    CommonModule,
    IdiomasRoutingModule
  ]
})
export class IdiomasModule { }
