import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./my-courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'mi-perfil',
        loadChildren: () =>
          import('./miperfil/miperfil.module').then((m) => m.MiperfilModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./my-courses/courses.module').then((m) => m.CoursesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
