import { TestBed } from '@angular/core/testing';

import { CamionService } from './camion.service';

describe('CamionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamionService = TestBed.get(CamionService);
    expect(service).toBeTruthy();
  });
});
