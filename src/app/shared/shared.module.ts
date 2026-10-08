import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCursoComponent } from './components/card-curso/card-curso.component';
import { MonthDayPickerComponent } from './components/month-day-picker/month-day-picker.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { SharedPipeModule } from './pipes/shared-pipe.module';
import { AssociatedAccountCardComponent } from './components/associated-account-card/associated-account-card.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderCoursesComponent } from './components/slider-courses/slider-courses.component';

@NgModule({
  declarations: [
    CardCursoComponent,
    MonthDayPickerComponent,
    AssociatedAccountCardComponent,
    SliderCoursesComponent,
  ],
  imports: [
    CheckboxModule,
    CommonModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    TagModule,
    ProgressSpinnerModule,
    RouterModule,
    BadgeModule,
    SharedPipeModule,
    FormsModule,
  ],
  exports: [
    CardCursoComponent,
    ProgressSpinnerModule,
    SharedPipeModule,
    MonthDayPickerComponent,
    AssociatedAccountCardComponent,
    SliderCoursesComponent,
  ],
})
export class SharedModule {}
