import { TestBed } from '@angular/core/testing';

import { QualiteService } from './qualite.service';

describe('QualiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualiteService = TestBed.get(QualiteService);
    expect(service).toBeTruthy();
  });
});
