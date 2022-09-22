import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightsAccessComponent } from './user-rights-access.component';

describe('UserRightsAccessComponent', () => {
  let component: UserRightsAccessComponent;
  let fixture: ComponentFixture<UserRightsAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightsAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRightsAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
