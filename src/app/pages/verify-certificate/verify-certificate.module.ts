import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyCertificateRoutingModule } from './verify-certificate-routing.module';
import { VerifyCertificateComponent } from './verify-certificate.component';

@NgModule({
  declarations: [VerifyCertificateComponent],
  imports: [CommonModule, VerifyCertificateRoutingModule],
})
export class VerifyCertificateModule {}
