import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetasAsociadasComponent } from './tarjetas-asociadas.component';
import { TarjetasAsociadasRoutingModule } from './tarjetas-asociadas-routing.module';



@NgModule({
  declarations: [
    TarjetasAsociadasComponent
  ],
  imports: [
    CommonModule,
    TarjetasAsociadasRoutingModule
  ],
  exports:[
    TarjetasAsociadasComponent
  ]
})
export class TarjetasAsociadasModule { }
