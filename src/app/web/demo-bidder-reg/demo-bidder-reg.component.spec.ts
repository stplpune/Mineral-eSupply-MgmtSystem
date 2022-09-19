import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBidderRegComponent } from './demo-bidder-reg.component';

describe('DemoBidderRegComponent', () => {
  let component: DemoBidderRegComponent;
  let fixture: ComponentFixture<DemoBidderRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoBidderRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoBidderRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
