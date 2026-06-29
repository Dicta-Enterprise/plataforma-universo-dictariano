import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';


import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './my-courses.component';


@NgModule({
  declarations: [MyCoursesComponent],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
     SharedModule
  ]
})
export class MyCoursesModule { }
