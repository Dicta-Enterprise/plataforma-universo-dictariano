import { TestBed } from '@angular/core/testing';

import { CursosService as CursosServiceSpec } from './cursos.service';

describe('CursosService', () => {
  let service: CursosServiceSpec;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosServiceSpec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
