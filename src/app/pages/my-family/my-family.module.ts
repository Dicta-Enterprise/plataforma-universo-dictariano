import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFamilyRoutingModule } from './my-family-routing.module';
import { MyFamilyComponent } from './my-family.component';

import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [MyFamilyComponent, SidebarComponent],
  imports: [CommonModule, MyFamilyRoutingModule, AvatarModule],
})
export class MyFamilyModule {}
