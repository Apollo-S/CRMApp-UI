import { TestBed, inject } from '@angular/core/testing';

import { EmployeePostService } from './employee-post.service';

describe('EmployeePostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeePostService]
    });
  });

  it('should be created', inject([EmployeePostService], (service: EmployeePostService) => {
    expect(service).toBeTruthy();
  }));
});
