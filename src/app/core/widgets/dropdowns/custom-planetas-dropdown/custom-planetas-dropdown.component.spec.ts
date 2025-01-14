import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlanetasDropdownComponent } from './custom-planetas-dropdown.component';

describe('CustomPlanetasDropdownComponent', () => {
  let component: CustomPlanetasDropdownComponent;
  let fixture: ComponentFixture<CustomPlanetasDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPlanetasDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomPlanetasDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
