import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule } from '@angular/router';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilPrimengModule } from 'src/app/core/themes/perfil/admin-primeng.module';
import { CustomSidebarModule } from 'src/app/shared/components/custom-sidebar/custom-sidebar.module';
import { CustomTopbarModule } from 'src/app/shared/components/custom-topbar/custom-topbar.module';
import { MiFacturacionComponent } from './mi-facturacion/mi-facturacion.component';



@NgModule({
  declarations: [
    PerfilComponent,
    MiFacturacionComponent
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
