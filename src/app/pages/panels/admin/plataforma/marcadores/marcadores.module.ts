import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcadoresRoutingModule } from './marcadores-routing.module';
import { MarcadoresComponent } from './marcadores.component';


@NgModule({
  declarations: [
    MarcadoresComponent
  ],
  imports: [
    CommonModule,
    MarcadoresRoutingModule
  ]
})
export class MarcadoresModule { }
