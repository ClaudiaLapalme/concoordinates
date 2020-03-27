import { Injectable } from '@angular/core';
import { OutdoorPOIFactoryService } from './outdoor-poi-factory.service';
import { IndoorPOIFactoryService } from './indoor-poi-factory.service';
import { MapService } from '../services/map.service';

@Injectable()
export class AbstractPOIFactoryService {

  constructor() { }

  createOutdoorPOIFactory(): OutdoorPOIFactoryService {
    return new OutdoorPOIFactoryService();
  };

  createIndoorPOIFactory(): IndoorPOIFactoryService {
    return new IndoorPOIFactoryService();
  };
}
