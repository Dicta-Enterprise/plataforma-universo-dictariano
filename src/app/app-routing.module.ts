import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/security/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './shared/layouts/blank-layout/blank-layout.component';

const routes: Routes = [
  // Rutas CON navbar
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule),
      },
    ]
  },

  // Rutas SIN navbar (flujo de pago)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
      },{
        path: 'payment',
        loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule),
        canActivate: [AuthGuard],
      },
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}