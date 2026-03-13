import { TestBed } from '@angular/core/testing';

import { CategoriaService as CategoriaServiceSpec } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaServiceSpec;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaServiceSpec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
