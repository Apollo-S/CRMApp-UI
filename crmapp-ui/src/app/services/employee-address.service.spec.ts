import { TestBed, inject } from '@angular/core/testing';

import { EmployeeAddressService } from './employee-address.service';

describe('EmployeeAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeAddressService]
    });
  });

  it('should be created', inject([EmployeeAddressService], (service: EmployeeAddressService) => {
    expect(service).toBeTruthy();
  }));
});
