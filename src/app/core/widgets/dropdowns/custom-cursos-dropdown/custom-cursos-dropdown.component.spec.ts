import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCursosDropdownComponent } from './custom-cursos-dropdown.component';

describe('CustomCursosDropdownComponent', () => {
  let component: CustomCursosDropdownComponent;
  let fixture: ComponentFixture<CustomCursosDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCursosDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomCursosDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
