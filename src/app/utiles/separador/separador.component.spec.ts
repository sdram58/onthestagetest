import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparadorComponent } from './separador.component';

describe('SeparadorComponent', () => {
  let component: SeparadorComponent;
  let fixture: ComponentFixture<SeparadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
