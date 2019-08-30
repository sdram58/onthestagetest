import { TestBed, inject } from '@angular/core/testing';

import { TiposEventoService } from './tipos-evento.service';

describe('TiposEventoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposEventoService]
    });
  });

  it('should be created', inject([TiposEventoService], (service: TiposEventoService) => {
    expect(service).toBeTruthy();
  }));
});
