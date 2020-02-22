import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkaiComponent } from './addkai.component';

describe('AddkaiComponent', () => {
  let component: AddkaiComponent;
  let fixture: ComponentFixture<AddkaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddkaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddkaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
