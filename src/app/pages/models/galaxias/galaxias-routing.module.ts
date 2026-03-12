import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaxiasComponent } from './galaxias.component';



const routes: Routes = [
  {
    path: '',
    component: GalaxiasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalaxiasRoutingModule {}
