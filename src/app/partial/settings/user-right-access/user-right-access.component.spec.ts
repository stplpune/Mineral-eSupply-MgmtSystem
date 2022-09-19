import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightAccessComponent } from './user-right-access.component';

describe('UserRightAccessComponent', () => {
  let component: UserRightAccessComponent;
  let fixture: ComponentFixture<UserRightAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRightAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
