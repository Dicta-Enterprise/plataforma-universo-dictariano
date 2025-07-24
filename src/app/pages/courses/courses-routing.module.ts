import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'todos',
        loadChildren: () =>
          import('./cursos-todos/cursos-todos.module')
            .then(m => m.CursosTodosModule)
      },
      {
        path: 'padres',
        loadChildren: () =>
          import('./cursos-padres/cursos-padres.module')
            .then(m => m.CursosPadresModule)
      },
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
