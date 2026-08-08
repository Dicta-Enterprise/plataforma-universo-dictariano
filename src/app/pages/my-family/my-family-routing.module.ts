import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFamilyComponent } from './my-family.component';

const routes: Routes = [
  {
    path: '',
    component: MyFamilyComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-account',
        pathMatch: 'full',
      },
      {
        path: 'my-account',
        loadChildren: () =>
          import('./my-account/my-account.module').then(
            (m) => m.MyAccountModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFamilyRoutingModule {}
