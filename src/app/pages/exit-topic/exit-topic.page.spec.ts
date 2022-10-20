import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitTopicPage } from './exit-topic.page';

describe('ExitTopicPage', () => {
  let component: ExitTopicPage;
  let fixture: ComponentFixture<ExitTopicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitTopicPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
