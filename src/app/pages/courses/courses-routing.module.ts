import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CursosTodosComponent } from './cursos-todos/cursos-todos.component';
import { CursosPadresComponent } from './cursos-padres/cursos-padres.component';
import { CursosJovenesComponent } from './cursos-jovenes/cursos-jovenes.component';
import { CursosNinosComponent } from './cursos-ninos/cursos-ninos.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'todos', component: CursosTodosComponent },
      { path: 'padres', component: CursosPadresComponent },
      { path: 'jovenes', component: CursosJovenesComponent },
      { path: 'ninos', component: CursosNinosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
