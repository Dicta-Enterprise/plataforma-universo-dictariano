import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosJovenesComponent } from './cursos-jovenes.component';

describe('CursosJovenesComponent', () => {
  let component: CursosJovenesComponent;
  let fixture: ComponentFixture<CursosJovenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosJovenesComponent]
    });
    fixture = TestBed.createComponent(CursosJovenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
