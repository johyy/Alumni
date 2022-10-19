import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveGroupButtonComponent } from './leave-group-button.component';

describe('LeaveGroupButtonComponent', () => {
  let component: LeaveGroupButtonComponent;
  let fixture: ComponentFixture<LeaveGroupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveGroupButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveGroupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
