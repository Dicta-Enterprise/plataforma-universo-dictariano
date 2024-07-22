import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcadoresComponent } from './marcadores.component';

const routes: Routes = [
  {path:'', component: MarcadoresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcadoresRoutingModule { }
