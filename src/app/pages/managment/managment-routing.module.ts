import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagmentComponent } from './managment.component';

const routes: Routes = [
  {
    path: '',
    component: ManagmentComponent,
    children: [
      {
        path: 'cursos',
        loadChildren: () =>
          import('./cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'categoria',
        loadChildren: () =>
          import('./categoria/categoria.module').then((m) => m.CategoriaModule),
      },
      {
        path:'galaxias',
        loadChildren: () =>
          import('./galaxias/galaxias.module').then((m) => m.GalaxiasModule),
      },
      {
        path:'planetas',
        loadChildren: () =>
          import('./planetas/planetas.module').then((m) => m.PlanetasModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagmentRoutingModule {}
