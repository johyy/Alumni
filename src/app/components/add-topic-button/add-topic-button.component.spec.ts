import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicButtonComponent } from './add-topic-button.component';

describe('AddTopicButtonComponent', () => {
  let component: AddTopicButtonComponent;
  let fixture: ComponentFixture<AddTopicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTopicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
