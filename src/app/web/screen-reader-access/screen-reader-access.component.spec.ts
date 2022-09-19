import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenReaderAccessComponent } from './screen-reader-access.component';

describe('ScreenReaderAccessComponent', () => {
  let component: ScreenReaderAccessComponent;
  let fixture: ComponentFixture<ScreenReaderAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenReaderAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenReaderAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
