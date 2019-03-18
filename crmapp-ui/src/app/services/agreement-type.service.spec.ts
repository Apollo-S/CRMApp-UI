import { TestBed, inject } from '@angular/core/testing';

import { AgreementTypeService } from './agreement-type.service';

describe('AgreementTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgreementTypeService]
    });
  });

  it('should be created', inject([AgreementTypeService], (service: AgreementTypeService) => {
    expect(service).toBeTruthy();
  }));
});
