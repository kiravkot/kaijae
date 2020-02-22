import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscoreComponent } from './addscore.component';

describe('AddscoreComponent', () => {
  let component: AddscoreComponent;
  let fixture: ComponentFixture<AddscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
