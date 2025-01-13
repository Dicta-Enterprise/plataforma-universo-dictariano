import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSidebarComponent } from './custom-sidebar.component';
import { PerfilPrimengModule } from 'src/app/core/themes/perfil/admin-primeng.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomSidebarComponent
  ],
  imports: [
    CommonModule,
    PerfilPrimengModule,
    RouterModule
  ],
  exports: [
    CustomSidebarComponent,
  ]
})
export class CustomSidebarModule { }
