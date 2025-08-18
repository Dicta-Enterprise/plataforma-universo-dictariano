import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosNinosComponent } from './cursos-ninos.component';

describe('CursosNinosComponent', () => {
  let component: CursosNinosComponent;
  let fixture: ComponentFixture<CursosNinosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosNinosComponent]
    });
    fixture = TestBed.createComponent(CursosNinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
