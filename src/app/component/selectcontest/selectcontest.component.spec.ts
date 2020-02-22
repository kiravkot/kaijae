import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcontestComponent } from './selectcontest.component';

describe('SelectcontestComponent', () => {
  let component: SelectcontestComponent;
  let fixture: ComponentFixture<SelectcontestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcontestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcontestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
