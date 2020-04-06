import { TestBed } from '@angular/core/testing';

import { ShuttleService } from './shuttle.service';

describe('ShuttleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShuttleService = TestBed.get(ShuttleService);
    expect(service).toBeTruthy();
  });
});
