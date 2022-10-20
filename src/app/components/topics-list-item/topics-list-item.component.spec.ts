import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsListItemComponent } from './topics-list-item.component';

describe('TopicsListItemComponent', () => {
  let component: TopicsListItemComponent;
  let fixture: ComponentFixture<TopicsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
