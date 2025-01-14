import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetasComponent } from './planetas.component';

describe('PlanetasComponent', () => {
  let component: PlanetasComponent;
  let fixture: ComponentFixture<PlanetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanetasComponent]
    });
    fixture = TestBed.createComponent(PlanetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
