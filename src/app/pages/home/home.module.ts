import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'primeng/carousel';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    ChipModule,
    SharedModule,
    CarouselModule,
    RippleModule,
  ],
})
export class HomeModule {}
