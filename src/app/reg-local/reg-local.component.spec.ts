import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLocalComponent } from './reg-local.component';

describe('RegLocalComponent', () => {
  let component: RegLocalComponent;
  let fixture: ComponentFixture<RegLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
