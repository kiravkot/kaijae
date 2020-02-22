import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmregisComponent } from './confirmregis.component';

describe('ConfirmregisComponent', () => {
  let component: ConfirmregisComponent;
  let fixture: ComponentFixture<ConfirmregisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmregisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmregisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
