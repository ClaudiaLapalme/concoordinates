import { TestBed } from '@angular/core/testing';
import { OutdoorPOIFactoryService } from './outdoor-poi-factory.service';

describe('OutdoorPoiFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutdoorPOIFactoryService = TestBed.get(OutdoorPOIFactoryService);
    expect(service).toBeTruthy();
  });
});
