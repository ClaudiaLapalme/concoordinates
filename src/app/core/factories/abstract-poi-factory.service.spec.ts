import { AbstractPOIFactoryService } from './abstract-poi-factory.service';
import { OutdoorPOIFactoryService } from './outdoor-poi-factory.service';

describe('AbstractPoiFactoryService', () => {

  function testServiceSetup() {

    return new AbstractPOIFactoryService();
  }

  it('should be created', () => {
    const abstractPOIFactory = testServiceSetup();
    expect(abstractPOIFactory).toBeTruthy();
  });

  describe('createOutdoorPOIFactory()', () => {

    it('should return an outdoor poi factory', () => {

      const abstractPOIFactory = testServiceSetup();
      const outdoorPOIFactory = abstractPOIFactory.createOutdoorPOIFactory();

      expect(outdoorPOIFactory).toEqual(new OutdoorPOIFactoryService);
    });
  });
});