import { TestBed } from '@angular/core/testing';

import { CursosManagmentService } from './cursos-managment.service';

describe('CursosManagmentService', () => {
  let service: CursosManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
