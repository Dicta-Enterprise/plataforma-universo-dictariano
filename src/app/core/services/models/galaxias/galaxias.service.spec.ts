import { TestBed } from '@angular/core/testing';

import { GalaxiasService } from './galaxias.service';

describe('GalaxiasService', () => {
  let service: GalaxiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalaxiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
