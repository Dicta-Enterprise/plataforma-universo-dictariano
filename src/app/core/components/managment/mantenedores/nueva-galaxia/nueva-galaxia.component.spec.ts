import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaGalaxiaComponent } from './nueva-galaxia.component';

describe('NuevaGalaxiaComponent', () => {
  let component: NuevaGalaxiaComponent;
  let fixture: ComponentFixture<NuevaGalaxiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaGalaxiaComponent]
    });
    fixture = TestBed.createComponent(NuevaGalaxiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
