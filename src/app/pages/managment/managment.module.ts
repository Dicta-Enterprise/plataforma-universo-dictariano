import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagmentComponent } from './managment.component';
import { ManagmentRoutingModule } from './managment-routing.module';
import { RouterModule } from '@angular/router';
import { CustomSidebarModule } from 'src/app/shared/components/custom-sidebar/custom-sidebar.module';
import { CustomTopbarModule } from 'src/app/shared/components/custom-topbar/custom-topbar.module';



@NgModule({
  declarations: [
    ManagmentComponent
  ],
  imports: [
    CommonModule,
    ManagmentRoutingModule,
    RouterModule,
    CustomSidebarModule,
    CustomTopbarModule
  ]
})
export class ManagmentModule { }
