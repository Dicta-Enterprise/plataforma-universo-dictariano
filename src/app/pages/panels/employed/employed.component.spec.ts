import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedComponent } from './employed.component';

describe('EmployedComponent', () => {
  let component: EmployedComponent;
  let fixture: ComponentFixture<EmployedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployedComponent]
    });
    fixture = TestBed.createComponent(EmployedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
