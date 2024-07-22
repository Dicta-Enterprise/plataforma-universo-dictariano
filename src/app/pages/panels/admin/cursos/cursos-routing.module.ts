import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'nuevo-curso', loadChildren:()=>import('./nuevo-curso/nuevo-curso.module').then(m=>m.NuevoCursoModule)},
  {path:'listar-curso', loadChildren:()=>import('./listar-cursos/listar-cursos.module').then(m=>m.ListarCursosModule)},
  {path:'estadisticas', loadChildren:()=>import('./estadisticas/estadisticas.module').then(m=>m.EstadisticasModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
