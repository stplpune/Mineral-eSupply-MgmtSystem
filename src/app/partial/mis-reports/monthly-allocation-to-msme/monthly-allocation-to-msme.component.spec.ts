import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAllocationToMsmeComponent } from './monthly-allocation-to-msme.component';

describe('MonthlyAllocationToMsmeComponent', () => {
  let component: MonthlyAllocationToMsmeComponent;
  let fixture: ComponentFixture<MonthlyAllocationToMsmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAllocationToMsmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyAllocationToMsmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
