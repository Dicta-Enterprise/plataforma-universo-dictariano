import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';
import { VerifyEmailGuard } from 'src/app/core/security/verify-email.guard';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailComponent,
    canActivate: [VerifyEmailGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmailRoutingModule {}