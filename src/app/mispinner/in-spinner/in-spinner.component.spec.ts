import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InSpinnerComponent } from './in-spinner.component';

describe('InSpinnerComponent', () => {
  let component: InSpinnerComponent;
  let fixture: ComponentFixture<InSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
