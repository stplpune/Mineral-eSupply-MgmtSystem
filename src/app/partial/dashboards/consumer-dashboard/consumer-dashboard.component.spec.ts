import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDashboardComponent } from './consumer-dashboard.component';

describe('ConsumerDashboardComponent', () => {
  let component: ConsumerDashboardComponent;
  let fixture: ComponentFixture<ConsumerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
