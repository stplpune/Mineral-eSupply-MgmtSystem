import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerRegistrationComponent } from './consumer-registration.component';

describe('ConsumerRegistrationComponent', () => {
  let component: ConsumerRegistrationComponent;
  let fixture: ComponentFixture<ConsumerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
