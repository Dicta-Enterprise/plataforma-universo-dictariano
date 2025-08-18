import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPadresComponent } from './cursos-padres.component';

describe('CursosPadresComponent', () => {
  let component: CursosPadresComponent;
  let fixture: ComponentFixture<CursosPadresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosPadresComponent]
    });
    fixture = TestBed.createComponent(CursosPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
