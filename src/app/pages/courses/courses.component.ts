import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../core/interfaces/courses/ICourse.interface';
import { CCOURSE_CONSTANT } from '../../core/constants/courses/CCourses.constant';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {

  courses:ICourse[] = CCOURSE_CONSTANT;


  ngOnInit(): void {}
}
