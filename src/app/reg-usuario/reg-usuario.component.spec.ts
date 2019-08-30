import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUsuarioComponent } from './reg-usuario.component';

describe('RegUsuarioComponent', () => {
  let component: RegUsuarioComponent;
  let fixture: ComponentFixture<RegUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
