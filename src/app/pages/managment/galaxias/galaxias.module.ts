import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalaxiasComponent } from './galaxias.component';
import { GalaxiasRoutingModule } from './galaxias-routing.module';



@NgModule({
  declarations: [
    GalaxiasComponent
  ],
  imports: [
    CommonModule,
    GalaxiasRoutingModule
  ]
})
export class GalaxiasModule { }
