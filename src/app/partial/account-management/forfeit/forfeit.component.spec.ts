import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfeitComponent } from './forfeit.component';

describe('ForfeitComponent', () => {
  let component: ForfeitComponent;
  let fixture: ComponentFixture<ForfeitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfeitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForfeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
