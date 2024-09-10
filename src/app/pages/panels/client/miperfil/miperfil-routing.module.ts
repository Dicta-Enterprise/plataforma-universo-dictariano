import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiperfilComponent } from './miperfil.component';

const routes: Routes = [
  {
    path:'',
    component:MiperfilComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiperfilRoutingModule { }
