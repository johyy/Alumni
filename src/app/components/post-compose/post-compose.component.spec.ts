import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComposeComponent } from './post-compose.component';

describe('PostComposeComponent', () => {
  let component: PostComposeComponent;
  let fixture: ComponentFixture<PostComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
