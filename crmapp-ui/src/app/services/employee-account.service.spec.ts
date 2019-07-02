import { TestBed, inject } from '@angular/core/testing';

import { EmployeeAccountService } from './employee-account.service';

describe('EmployeeAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeAccountService]
    });
  });

  it('should be created', inject([EmployeeAccountService], (service: EmployeeAccountService) => {
    expect(service).toBeTruthy();
  }));
});
