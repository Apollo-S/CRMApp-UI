import { TestBed, inject } from '@angular/core/testing';

import { ClientDirectorService } from './client-director.service';

describe('ClientDirectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientDirectorService]
    });
  });

  it('should be created', inject([ClientDirectorService], (service: ClientDirectorService) => {
    expect(service).toBeTruthy();
  }));
});
