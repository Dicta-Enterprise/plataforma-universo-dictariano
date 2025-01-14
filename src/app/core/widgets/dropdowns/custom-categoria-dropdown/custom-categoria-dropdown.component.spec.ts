import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCategoriaDropdownComponent } from './custom-categoria-dropdown.component';

describe('CustomCategoriaDropdownComponent', () => {
  let component: CustomCategoriaDropdownComponent;
  let fixture: ComponentFixture<CustomCategoriaDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCategoriaDropdownComponent]
    });
    fixture = TestBed.createComponent(CustomCategoriaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
