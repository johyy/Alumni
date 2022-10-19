import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicComposeComponent } from './topic-compose.component';

describe('TopicComposeComponent', () => {
  let component: TopicComposeComponent;
  let fixture: ComponentFixture<TopicComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicComposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
