import { TestBed } from '@angular/core/testing';

import { AbstractPOIFactoryService } from './abstract-poi-factory.service';

describe('AbstractPoiFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractPOIFactoryService = TestBed.get(AbstractPOIFactoryService);
    expect(service).toBeTruthy();
  });
});
