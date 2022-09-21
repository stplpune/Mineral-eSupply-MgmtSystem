import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalAllocationComponent } from './coal-allocation.component';

describe('CoalAllocationComponent', () => {
  let component: CoalAllocationComponent;
  let fixture: ComponentFixture<CoalAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoalAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoalAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
