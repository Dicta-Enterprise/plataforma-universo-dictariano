import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule } from '@angular/router';
import { PerfilRoutingModule } from './perfil-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { PerfilPrimengModule } from 'src/app/core/themes/perfil/admin-primeng.module';
import { CustomSidebarModule } from 'src/app/shared/components/custom-sidebar/custom-sidebar.module';
import { CustomTopbarModule } from 'src/app/shared/components/custom-topbar/custom-topbar.module';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PerfilRoutingModule,
    PerfilPrimengModule,
    CustomSidebarModule,
    CustomTopbarModule
  ]
})
export class PerfilModule { }
