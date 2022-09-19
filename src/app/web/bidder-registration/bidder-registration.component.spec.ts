import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderRegistrationComponent } from './bidder-registration.component';

describe('BidderRegistrationComponent', () => {
  let component: BidderRegistrationComponent;
  let fixture: ComponentFixture<BidderRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
