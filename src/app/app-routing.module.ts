import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
  path: 'auth',
  children: [
    {
      path: 'login',
      loadChildren: () =>
        import('./pages/auth/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'register',
      loadChildren: () =>
        import('./pages/auth/register/register.module').then(m => m.RegisterModule)
    }
    ]
  },
 
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  { path: 'cart', 
    loadChildren: () => 
    import('./pages/cart/cart.module').then(m => m.CartModule) 
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
