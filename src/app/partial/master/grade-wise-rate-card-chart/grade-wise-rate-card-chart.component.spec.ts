import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseRateCardChartComponent } from './grade-wise-rate-card-chart.component';

describe('GradeWiseRateCardChartComponent', () => {
  let component: GradeWiseRateCardChartComponent;
  let fixture: ComponentFixture<GradeWiseRateCardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeWiseRateCardChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeWiseRateCardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
