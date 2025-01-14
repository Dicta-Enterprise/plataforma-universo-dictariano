import { TestBed } from '@angular/core/testing';

import { GalaxiasManagmentService } from './galaxias-managment.service';

describe('GalaxiasManagmentService', () => {
  let service: GalaxiasManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalaxiasManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
