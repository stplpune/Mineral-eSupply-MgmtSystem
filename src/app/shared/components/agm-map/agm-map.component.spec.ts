import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmMapComponent } from './agm-map.component';

describe('AgmMapComponent', () => {
  let component: AgmMapComponent;
  let fixture: ComponentFixture<AgmMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgmMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgmMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
