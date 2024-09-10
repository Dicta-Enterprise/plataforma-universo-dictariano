import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MenubarModule } from 'primeng/menubar';
import {StyleClassModule} from 'primeng/styleclass';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MenubarModule,
    StyleClassModule
  ]
})
export class ProfileModule { }
