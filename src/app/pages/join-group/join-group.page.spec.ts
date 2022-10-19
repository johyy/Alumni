import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGroupPage } from './join-group.page';

describe('JoinGroupPage', () => {
  let component: JoinGroupPage;
  let fixture: ComponentFixture<JoinGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGroupPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
