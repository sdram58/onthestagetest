import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MispinnerComponent } from './mispinner.component';

describe('MispinnerComponent', () => {
  let component: MispinnerComponent;
  let fixture: ComponentFixture<MispinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MispinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MispinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
