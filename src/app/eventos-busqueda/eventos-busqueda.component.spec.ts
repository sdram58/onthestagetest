import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosBusquedaComponent } from './eventos-busqueda.component';

describe('EventosBusquedaComponent', () => {
  let component: EventosBusquedaComponent;
  let fixture: ComponentFixture<EventosBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
