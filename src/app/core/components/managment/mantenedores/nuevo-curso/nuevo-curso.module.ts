import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoCursoComponent } from './nuevo-curso.component';



@NgModule({
  declarations: [
    NuevoCursoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NuevoCursoComponent
  ]

})
export class NuevoCursoModule { }
