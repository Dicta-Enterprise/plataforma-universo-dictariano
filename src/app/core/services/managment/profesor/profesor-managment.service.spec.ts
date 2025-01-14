import { TestBed } from '@angular/core/testing';

import { ProfesorManagmentService } from './profesor-managment.service';

describe('ProfesorManagmentService', () => {
  let service: ProfesorManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
