import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGalaxiasDropdownComponent } from './custom-galaxias-dropdown.component';

describe('CustomGalaxiasDropdownComponent', () => {
  let component: CustomGalaxiasDropdownComponent;
  let fixture: ComponentFixture<CustomGalaxiasDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomGalaxiasDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomGalaxiasDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
