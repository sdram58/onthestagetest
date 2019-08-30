import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoregArtistaComponent } from './noreg-artista.component';

describe('NoregArtistaComponent', () => {
  let component: NoregArtistaComponent;
  let fixture: ComponentFixture<NoregArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoregArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoregArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
