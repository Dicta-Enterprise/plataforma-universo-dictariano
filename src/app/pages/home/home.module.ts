import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ButtonModule, SharedModule],
})
export class HomeModule {}
