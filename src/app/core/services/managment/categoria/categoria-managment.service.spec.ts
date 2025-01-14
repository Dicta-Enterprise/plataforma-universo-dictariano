import { TestBed } from '@angular/core/testing';

import { CategoriaManagmentService } from './categoria-managment.service';

describe('CategoriaManagmentService', () => {
  let service: CategoriaManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
