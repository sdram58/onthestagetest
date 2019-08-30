import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoregLocalComponent } from './noreg-local.component';

describe('NoregLocalComponent', () => {
  let component: NoregLocalComponent;
  let fixture: ComponentFixture<NoregLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoregLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoregLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
