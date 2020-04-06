import { TestBed } from '@angular/core/testing';

import { CampusBoundsService } from './campus-bounds.service';

describe('CampusBoundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampusBoundsService = TestBed.get(CampusBoundsService);
    expect(service).toBeTruthy();
  });
});
