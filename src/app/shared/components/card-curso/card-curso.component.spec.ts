import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCursoComponent } from './card-curso.component';

describe('CardCursoComponent', () => {
  let component: CardCursoComponent;
  let fixture: ComponentFixture<CardCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCursoComponent]
    });
    fixture = TestBed.createComponent(CardCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
