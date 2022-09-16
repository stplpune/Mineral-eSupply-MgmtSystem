import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialLayoutComponent } from './partial-layout.component';

describe('PartialLayoutComponent', () => {
  let component: PartialLayoutComponent;
  let fixture: ComponentFixture<PartialLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
