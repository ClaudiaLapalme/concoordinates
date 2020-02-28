import { Injectable } from '@angular/core';
import { OutdoorPOIFactoryService } from './outdoor-poi-factory.service';

@Injectable()
export class AbstractPOIFactoryService {

  constructor() { }

  createOutdoorPOIFactory(): OutdoorPOIFactoryService {
    return new OutdoorPOIFactoryService();
  };
}
