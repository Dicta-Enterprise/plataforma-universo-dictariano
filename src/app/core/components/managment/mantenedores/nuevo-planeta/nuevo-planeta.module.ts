import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoPlanetaComponent } from './nuevo-planeta.component';



@NgModule({
  declarations: [
    NuevoPlanetaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NuevoPlanetaComponent
  ]
  
})
export class NuevoPlanetaModule { }
