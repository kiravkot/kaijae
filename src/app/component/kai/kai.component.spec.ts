import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaiComponent } from './kai.component';

describe('KaiComponent', () => {
  let component: KaiComponent;
  let fixture: ComponentFixture<KaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
