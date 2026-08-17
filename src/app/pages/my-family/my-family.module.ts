import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFamilyRoutingModule } from './my-family-routing.module';
import { MyFamilyComponent } from './my-family.component';

import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [MyFamilyComponent],
  imports: [CommonModule, MyFamilyRoutingModule, AvatarModule],
})
export class MyFamilyModule {}
