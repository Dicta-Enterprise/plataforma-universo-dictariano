import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCursoComponent } from './components/card-curso/card-curso.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CourseCarouselComponent } from './components/course-carousel/course-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { SharedPipeModule } from './pipes/shared-pipe.module';



@NgModule({
  declarations: [
    CardCursoComponent,
    CourseCarouselComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    ProgressSpinnerModule,
    RouterModule,
    BadgeModule,
    SharedPipeModule
  ],
  exports: [
    CardCursoComponent,
    CourseCarouselComponent,
    ProgressSpinnerModule
  ]
})
export class SharedModule { }
