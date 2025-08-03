import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoDetalleComponent } from './curso-detalle.component';

const routes: Routes = [
  { path: ':id', component: CursoDetalleComponent }, // path param para el id del curso
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoDetalleRoutingModule {}
