import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSlipComponent } from './loading-slip.component';

describe('LoadingSlipComponent', () => {
  let component: LoadingSlipComponent;
  let fixture: ComponentFixture<LoadingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
