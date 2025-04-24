import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIdiomaDropdownComponent } from './custom-idioma-dropdown.component';

describe('CustomIdiomaDropdownComponent', () => {
  let component: CustomIdiomaDropdownComponent;
  let fixture: ComponentFixture<CustomIdiomaDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomIdiomaDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomIdiomaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
