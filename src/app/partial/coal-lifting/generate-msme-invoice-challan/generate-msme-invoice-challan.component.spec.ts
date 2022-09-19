import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMsmeInvoiceChallanComponent } from './generate-msme-invoice-challan.component';

describe('GenerateMsmeInvoiceChallanComponent', () => {
  let component: GenerateMsmeInvoiceChallanComponent;
  let fixture: ComponentFixture<GenerateMsmeInvoiceChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateMsmeInvoiceChallanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateMsmeInvoiceChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
