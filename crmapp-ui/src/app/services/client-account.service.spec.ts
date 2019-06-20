import { TestBed, inject } from '@angular/core/testing';

import { ClientAccountService } from './client-account.service';

describe('ClientAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAccountService]
    });
  });

  it('should be created', inject([ClientAccountService], (service: ClientAccountService) => {
    expect(service).toBeTruthy();
  }));
});
