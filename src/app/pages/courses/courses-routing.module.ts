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
          import('./cursos-todos/cursos-todos.module').then(
            (m) => m.CursosTodosModule,
          ),
      },
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
      {
        path: 'short',
        loadChildren: () =>
          import('./curso-short/curso-short.module').then(
            (m) => m.CursoShortModule,
          ),
      },
      {
        path: 'detalle',
        loadChildren: () =>
          import('./curso-detalle/curso-detalle.module').then(
            (m) => m.CursoDetalleModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
