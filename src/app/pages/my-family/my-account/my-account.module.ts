import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [CommonModule, MyAccountRoutingModule, AvatarModule, ButtonModule],
})
export class MyAccountModule {}
