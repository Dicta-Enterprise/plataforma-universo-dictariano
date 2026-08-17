import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedAccountCardComponent } from './associated-account-card.component';

describe('AssociatedAccountCardComponent', () => {
  let component: AssociatedAccountCardComponent;
  let fixture: ComponentFixture<AssociatedAccountCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatedAccountCardComponent]
    });
    fixture = TestBed.createComponent(AssociatedAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
