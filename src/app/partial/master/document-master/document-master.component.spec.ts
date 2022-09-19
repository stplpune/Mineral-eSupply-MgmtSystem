import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMasterComponent } from './document-master.component';

describe('DocumentMasterComponent', () => {
  let component: DocumentMasterComponent;
  let fixture: ComponentFixture<DocumentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
