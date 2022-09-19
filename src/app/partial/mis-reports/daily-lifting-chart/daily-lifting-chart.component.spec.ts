import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLiftingChartComponent } from './daily-lifting-chart.component';

describe('DailyLiftingChartComponent', () => {
  let component: DailyLiftingChartComponent;
  let fixture: ComponentFixture<DailyLiftingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyLiftingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyLiftingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
