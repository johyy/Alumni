import { TestBed } from '@angular/core/testing';

import { RefreshTokenHttpInterceptor } from './refresh-token-http.interceptor';

describe('RefreshTokenHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshTokenHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RefreshTokenHttpInterceptor = TestBed.inject(RefreshTokenHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
