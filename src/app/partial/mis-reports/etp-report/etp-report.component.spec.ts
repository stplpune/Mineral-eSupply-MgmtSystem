import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpReportComponent } from './etp-report.component';

describe('EtpReportComponent', () => {
  let component: EtpReportComponent;
  let fixture: ComponentFixture<EtpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
