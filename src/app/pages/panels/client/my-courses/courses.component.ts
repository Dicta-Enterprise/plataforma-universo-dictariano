import { Component, OnInit } from '@angular/core';
import { CCOURSE_CONSTANT } from 'src/app/core/constants/constants';
import { ICourse } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  
})
export class CoursesComponent implements OnInit {

  courses:ICourse[] = CCOURSE_CONSTANT;


  ngOnInit(): void {}
}
