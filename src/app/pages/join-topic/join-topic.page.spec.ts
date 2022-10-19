import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTopicPage } from './join-topic.page';

describe('JoinTopicPage', () => {
  let component: JoinTopicPage;
  let fixture: ComponentFixture<JoinTopicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinTopicPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
