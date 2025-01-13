import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTopbarComponent } from './custom-topbar.component';

describe('CustomTopbarComponent', () => {
  let component: CustomTopbarComponent;
  let fixture: ComponentFixture<CustomTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTopbarComponent]
    });
    fixture = TestBed.createComponent(CustomTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
