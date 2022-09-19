import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalGradeMasterComponent } from './coal-grade-master.component';

describe('CoalGradeMasterComponent', () => {
  let component: CoalGradeMasterComponent;
  let fixture: ComponentFixture<CoalGradeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoalGradeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoalGradeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
