import { TestBed, inject } from '@angular/core/testing';

import { ClientAgreementService } from './client-agreement.service';

describe('ClientAgreementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAgreementService]
    });
  });

  it('should be created', inject([ClientAgreementService], (service: ClientAgreementService) => {
    expect(service).toBeTruthy();
  }));
});
