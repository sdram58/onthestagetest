import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEventosComponent } from './buscar-eventos.component';

describe('BuscarEventosComponent', () => {
  let component: BuscarEventosComponent;
  let fixture: ComponentFixture<BuscarEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
