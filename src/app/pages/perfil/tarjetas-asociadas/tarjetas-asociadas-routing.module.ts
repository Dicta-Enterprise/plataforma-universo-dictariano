import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetasAsociadasComponent } from './tarjetas-asociadas.component';

const routes: Routes = [
  {
    path: '',
    component: TarjetasAsociadasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasAsociadasRoutingModule {}
