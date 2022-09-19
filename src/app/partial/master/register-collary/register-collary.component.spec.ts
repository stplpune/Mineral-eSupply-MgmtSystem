import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCollaryComponent } from './register-collary.component';

describe('RegisterCollaryComponent', () => {
  let component: RegisterCollaryComponent;
  let fixture: ComponentFixture<RegisterCollaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCollaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCollaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
