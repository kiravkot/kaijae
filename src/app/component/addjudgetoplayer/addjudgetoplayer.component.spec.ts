import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjudgetoplayerComponent } from './addjudgetoplayer.component';

describe('AddjudgetoplayerComponent', () => {
  let component: AddjudgetoplayerComponent;
  let fixture: ComponentFixture<AddjudgetoplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjudgetoplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjudgetoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
