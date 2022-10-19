import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitTopicButtonComponent } from './exit-topic-button.component';

describe('ExitTopicButtonComponent', () => {
  let component: ExitTopicButtonComponent;
  let fixture: ComponentFixture<ExitTopicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitTopicButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitTopicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
