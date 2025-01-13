import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTopbarComponent } from './custom-topbar.component';
import { PerfilPrimengModule } from 'src/app/core/themes/perfil/admin-primeng.module';



@NgModule({
  declarations: [
    CustomTopbarComponent
  ],
  imports: [
    CommonModule,
    PerfilPrimengModule
  ],
  exports: [
    CustomTopbarComponent,
  ]
})
export class CustomTopbarModule { }
