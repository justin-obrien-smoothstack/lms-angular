import { TestBed } from '@angular/core/testing';

import { LmsService } from './lms.service';

describe('LmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmsService = TestBed.get(LmsService);
    expect(service).toBeTruthy();
  });
});
