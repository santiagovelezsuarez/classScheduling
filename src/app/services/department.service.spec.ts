import { TestBed } from '@angular/core/testing';

import { DepartmentService } from './department.service';

xdescribe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
