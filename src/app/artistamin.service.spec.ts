import { TestBed, inject } from '@angular/core/testing';

import { ArtistaminService } from './artistamin.service';

describe('ArtistaminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistaminService]
    });
  });

  it('should be created', inject([ArtistaminService], (service: ArtistaminService) => {
    expect(service).toBeTruthy();
  }));
});
