import { TestBed, inject } from '@angular/core/testing';

import { EventminService } from './eventmin.service';

describe('EventminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventminService]
    });
  });

  it('should be created', inject([EventminService], (service: EventminService) => {
    expect(service).toBeTruthy();
  }));
});
