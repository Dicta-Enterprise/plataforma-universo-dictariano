import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCoursesComponent } from './slider-courses.component';

describe('SliderCoursesComponent', () => {
  let component: SliderCoursesComponent;
  let fixture: ComponentFixture<SliderCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderCoursesComponent]
    });
    fixture = TestBed.createComponent(SliderCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
