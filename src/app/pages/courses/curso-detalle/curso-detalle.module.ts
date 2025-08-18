import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoDetalleComponent } from './curso-detalle.component';
import { CursoDetalleRoutingModule } from './curso-detalle-routing.module';

@NgModule({
  declarations: [CursoDetalleComponent],
  imports: [CommonModule, CursoDetalleRoutingModule]
})
export class CursoDetalleModule {}
