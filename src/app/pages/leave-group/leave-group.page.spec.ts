import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveGroupPage } from './leave-group.page';

describe('LeaveGroupPage', () => {
  let component: LeaveGroupPage;
  let fixture: ComponentFixture<LeaveGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveGroupPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
