import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLayoutComponent } from './web-layout.component';

describe('WebLayoutComponent', () => {
  let component: WebLayoutComponent;
  let fixture: ComponentFixture<WebLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
