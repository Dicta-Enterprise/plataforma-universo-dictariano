import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerJumpComponent } from './spinner-jump.component';

describe('SpinnerJumpComponent', () => {
  let component: SpinnerJumpComponent;
  let fixture: ComponentFixture<SpinnerJumpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerJumpComponent]
    });
    fixture = TestBed.createComponent(SpinnerJumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
