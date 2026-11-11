import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { VideoCarouselComponent } from './video-carousel.component';

@NgModule({
  declarations: [VideoCarouselComponent],
  imports: [CommonModule, ButtonModule, CardModule, RippleModule],
  exports: [VideoCarouselComponent],
})
export class VideoCarouselModule {}
