import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoIdiomaComponent } from './nuevo-idioma.component';



@NgModule({
  declarations: [
    NuevoIdiomaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NuevoIdiomaComponent
  ]

})
export class NuevoIdiomaModule { }
