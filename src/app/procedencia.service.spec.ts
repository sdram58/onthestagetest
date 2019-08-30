import { TestBed, inject } from '@angular/core/testing';

import { ProcedenciaService } from './procedencia.service';

describe('ProcedenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedenciaService]
    });
  });

  it('should be created', inject([ProcedenciaService], (service: ProcedenciaService) => {
    expect(service).toBeTruthy();
  }));
});
