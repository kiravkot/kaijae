import { TestBed } from '@angular/core/testing';

import { ContestDataService } from './contest-data.service';

describe('ContestDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContestDataService = TestBed.get(ContestDataService);
    expect(service).toBeTruthy();
  });
});
