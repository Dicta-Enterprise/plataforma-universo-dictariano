import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployedComponent } from './employed.component';

const routes: Routes = [
  {
    path: '',
    component: EmployedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployedRoutingModule { }
