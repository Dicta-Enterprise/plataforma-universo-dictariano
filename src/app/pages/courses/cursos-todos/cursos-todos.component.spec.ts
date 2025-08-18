import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosTodosComponent } from './cursos-todos.component';

describe('CursosTodosComponent', () => {
  let component: CursosTodosComponent;
  let fixture: ComponentFixture<CursosTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosTodosComponent]
    });
    fixture = TestBed.createComponent(CursosTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
