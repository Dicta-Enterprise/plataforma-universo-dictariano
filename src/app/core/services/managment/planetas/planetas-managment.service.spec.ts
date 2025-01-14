import { TestBed } from '@angular/core/testing';

import { PlanetasManagmentService } from './planetas-managment.service';

describe('PlanetasManagmentService', () => {
  let service: PlanetasManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetasManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
