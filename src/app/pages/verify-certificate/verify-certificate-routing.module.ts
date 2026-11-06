import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyCertificateComponent } from './verify-certificate.component';

const routes: Routes = [{ path: '', component: VerifyCertificateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyCertificateRoutingModule {}
