import { TestBed } from '@angular/core/testing';

import { EventsResolver } from './events.resolver';

describe('EventsResolverResolver', () => {
  let resolver: EventsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EventsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
