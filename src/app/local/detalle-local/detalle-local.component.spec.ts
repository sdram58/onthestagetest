import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocalComponent } from './detalle-local.component';

describe('DetalleLocalComponent', () => {
  let component: DetalleLocalComponent;
  let fixture: ComponentFixture<DetalleLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
