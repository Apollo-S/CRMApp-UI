import { TestBed, inject } from '@angular/core/testing';

import { CurrencyTypeService } from './currency-type.service';

describe('CurrencyTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyTypeService]
    });
  });

  it('should be created', inject([CurrencyTypeService], (service: CurrencyTypeService) => {
    expect(service).toBeTruthy();
  }));
});
