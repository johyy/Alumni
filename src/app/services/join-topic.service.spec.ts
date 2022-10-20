import { TestBed } from '@angular/core/testing';

import { JoinTopicService } from './join-topic.service';

describe('JoinTopicService', () => {
  let service: JoinTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
