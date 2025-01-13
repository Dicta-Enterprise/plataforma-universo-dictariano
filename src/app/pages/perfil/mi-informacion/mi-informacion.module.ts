import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiInformacionComponent } from './mi-informacion.component';
import { MiInformacionRoutingModule } from './mi-informacion-routing.module';



@NgModule({
  declarations: [
    MiInformacionComponent
  ],
  imports: [
    CommonModule,
    MiInformacionRoutingModule
  ],
  exports:[
    MiInformacionComponent
  ]
})
export class MiInformacionModule { }
