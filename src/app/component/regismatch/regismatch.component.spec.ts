import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegismatchComponent } from './regismatch.component';

describe('RegismatchComponent', () => {
  let component: RegismatchComponent;
  let fixture: ComponentFixture<RegismatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegismatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
