import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaLandingComponent } from './nueva-landing.component';

describe('NuevaLandingComponent', () => {
  let component: NuevaLandingComponent;
  let fixture: ComponentFixture<NuevaLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaLandingComponent]
    });
    fixture = TestBed.createComponent(NuevaLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
