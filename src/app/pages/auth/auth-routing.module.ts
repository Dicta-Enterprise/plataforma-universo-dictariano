import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path:'register',
    loadChildren:()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
  {
    path:'login',
    loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
