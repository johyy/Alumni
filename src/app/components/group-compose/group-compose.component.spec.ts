import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComposeComponent } from './group-compose.component';

describe('GroupComposeComponent', () => {
  let component: GroupComposeComponent;
  let fixture: ComponentFixture<GroupComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupComposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
