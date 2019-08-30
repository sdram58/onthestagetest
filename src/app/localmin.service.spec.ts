import { TestBed, inject } from '@angular/core/testing';

import { LocalminService } from './localmin.service';

describe('LocalminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalminService]
    });
  });

  it('should be created', inject([LocalminService], (service: LocalminService) => {
    expect(service).toBeTruthy();
  }));
});
