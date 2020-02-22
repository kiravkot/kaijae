import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpdfComponent } from './reportpdf.component';

describe('ReportpdfComponent', () => {
  let component: ReportpdfComponent;
  let fixture: ComponentFixture<ReportpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
