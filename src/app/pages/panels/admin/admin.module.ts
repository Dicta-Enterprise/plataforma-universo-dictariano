import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminPrimengModule } from 'src/app/core/themes/admin/admin-primeng.module';

import { SidebarComponent } from './menus/sidebar/sidebar.component';
import { TopbarComponent } from './menus/topbar/topbar.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, TopbarComponent],
  imports: [CommonModule, AdminRoutingModule, AdminPrimengModule],
})
export class AdminModule {}
