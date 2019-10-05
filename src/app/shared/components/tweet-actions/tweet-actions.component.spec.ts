import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetActionsComponent } from './tweet-actions.component';

describe('TweetActionsComponent', () => {
  let component: TweetActionsComponent;
  let fixture: ComponentFixture<TweetActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
