import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmeApplicationListComponent } from './msme-application-list.component';

describe('MsmeApplicationListComponent', () => {
  let component: MsmeApplicationListComponent;
  let fixture: ComponentFixture<MsmeApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsmeApplicationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsmeApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
