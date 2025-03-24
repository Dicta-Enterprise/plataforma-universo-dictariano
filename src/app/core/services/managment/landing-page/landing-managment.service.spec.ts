import { TestBed } from '@angular/core/testing';

import { LandingPageManagmentService } from './landing-managment.service';

describe('LandingPageService', () => {
  let service: LandingPageManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingPageManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
