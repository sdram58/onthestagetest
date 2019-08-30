import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegArtistaComponent } from './reg-artista.component';

describe('RegArtistaComponent', () => {
  let component: RegArtistaComponent;
  let fixture: ComponentFixture<RegArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
