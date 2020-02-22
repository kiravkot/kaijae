import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepermissionComponent } from './changepermission.component';

describe('ChangepermissionComponent', () => {
  let component: ChangepermissionComponent;
  let fixture: ComponentFixture<ChangepermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
