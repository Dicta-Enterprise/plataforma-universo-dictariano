import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPlanetaComponent } from './nuevo-planeta.component';

describe('NuevoPlanetaComponent', () => {
  let component: NuevoPlanetaComponent;
  let fixture: ComponentFixture<NuevoPlanetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoPlanetaComponent]
    });
    fixture = TestBed.createComponent(NuevoPlanetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
