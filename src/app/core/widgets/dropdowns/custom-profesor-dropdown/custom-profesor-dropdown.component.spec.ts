import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProfesorDropdownComponent } from './custom-profesor-dropdown.component';

describe('CustomProfesorDropdownComponent', () => {
  let component: CustomProfesorDropdownComponent;
  let fixture: ComponentFixture<CustomProfesorDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomProfesorDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomProfesorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
