import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanNnvoiceRequestComponent } from './challan-nnvoice-request.component';

describe('ChallanNnvoiceRequestComponent', () => {
  let component: ChallanNnvoiceRequestComponent;
  let fixture: ComponentFixture<ChallanNnvoiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanNnvoiceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanNnvoiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
