import { TestBed } from '@angular/core/testing';

import { CondbService } from './condb.service';

describe('CondbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CondbService = TestBed.get(CondbService);
    expect(service).toBeTruthy();
  });
});
