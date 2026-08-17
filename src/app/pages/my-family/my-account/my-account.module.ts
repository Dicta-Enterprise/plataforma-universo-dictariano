import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyAccountRoutingModule,
    AvatarModule,
    ButtonModule,
    ChipModule,
    SharedModule,
  ],
})
export class MyAccountModule {}
