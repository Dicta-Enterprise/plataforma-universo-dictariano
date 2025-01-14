import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaGalaxiaComponent } from './nueva-galaxia.component';



@NgModule({
  declarations: [
    NuevaGalaxiaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NuevaGalaxiaComponent
  ]
})
export class NuevaGalaxiaModule { }
