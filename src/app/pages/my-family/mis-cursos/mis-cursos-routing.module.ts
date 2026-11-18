import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisCursosComponent } from './mis-cursos.component';

const routes: Routes = [
  {
    path: '',
    component: MisCursosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisCursosRoutingModule {}
