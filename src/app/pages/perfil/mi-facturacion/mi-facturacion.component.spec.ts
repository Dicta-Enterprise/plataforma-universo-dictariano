import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiFacturacionComponent } from './mi-facturacion.component';

describe('MiFacturacionComponent', () => {
  let component: MiFacturacionComponent;
  let fixture: ComponentFixture<MiFacturacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiFacturacionComponent]
    });
    fixture = TestBed.createComponent(MiFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
