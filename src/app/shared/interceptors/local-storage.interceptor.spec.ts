import { TestBed } from '@angular/core/testing';

import { LocalStorageInterceptor } from './local-storage.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LocalStorageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LocalStorageInterceptor = TestBed.inject(LocalStorageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
