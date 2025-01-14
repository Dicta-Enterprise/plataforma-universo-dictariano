import { TestBed } from '@angular/core/testing';

import { IdiomaManagmentService } from './idioma-managment.service';

describe('IdiomaManagmentService', () => {
  let service: IdiomaManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdiomaManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
