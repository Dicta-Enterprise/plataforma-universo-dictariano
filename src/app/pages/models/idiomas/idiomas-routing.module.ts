import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdiomasComponent } from './idiomas.component';



const routes: Routes = [
  {
    path: '',
    component: IdiomasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdiomasRoutingModule {}
