import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('./plataforma/plataforma.module').then(m=>m.PlataformaModule)
      },
      {
        path:'cursos',
        loadChildren:()=>import('./cursos/cursos.module').then(m=>m.CursosModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
