import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoShortComponent } from './curso-short.component';

const routes: Routes = [
  { path: ':id', component: CursoShortComponent }, // path param para el id del curso
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoShortRoutingModule {}
