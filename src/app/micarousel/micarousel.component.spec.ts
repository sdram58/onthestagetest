import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicarouselComponent } from './micarousel.component';

describe('MicarouselComponent', () => {
  let component: MicarouselComponent;
  let fixture: ComponentFixture<MicarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
