import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { ModelsRoutingModule } from './models-routing.module';
import { RouterModule } from '@angular/router';
import { CustomSidebarModule } from 'src/app/shared/components/custom-sidebar/custom-sidebar.module';
import { CustomTopbarModule } from 'src/app/shared/components/custom-topbar/custom-topbar.module';



@NgModule({
  declarations: [
    ModelsComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    RouterModule,
    CustomSidebarModule,
    CustomTopbarModule
  ]
})
export class ManagmentModule { }
