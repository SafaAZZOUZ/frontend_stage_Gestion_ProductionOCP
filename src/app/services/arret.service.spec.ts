import { TestBed } from '@angular/core/testing';

import { ArretService } from './arret.service';

describe('ArretService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArretService = TestBed.get(ArretService);
    expect(service).toBeTruthy();
  });
});
