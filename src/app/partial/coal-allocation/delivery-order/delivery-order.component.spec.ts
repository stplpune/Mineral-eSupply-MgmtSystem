import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderComponent } from './delivery-order.component';

describe('DeliveryOrderComponent', () => {
  let component: DeliveryOrderComponent;
  let fixture: ComponentFixture<DeliveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
