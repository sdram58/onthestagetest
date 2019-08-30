import { TestBed, inject } from '@angular/core/testing';

import { LogupService } from './logup.service';

describe('LogupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogupService]
    });
  });

  it('should be created', inject([LogupService], (service: LogupService) => {
    expect(service).toBeTruthy();
  }));
});
