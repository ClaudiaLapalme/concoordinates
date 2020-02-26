import { OutdoorPOIFactoryService } from './outdoor-poi-factory.service';
import { Coordinates } from '../models';

describe('OutdoorPoiFactoryService', () => {

  function testSetup() {
    const outdoorPOIFactory = new OutdoorPOIFactoryService();
    const testCoordinates = new Coordinates(0,0,0);
    return {outdoorPOIFactory, testCoordinates}
  }

  it('should be created', () => {
    const outdoorPOIFactory = testSetup();
    expect(outdoorPOIFactory).toBeTruthy();
  });

  describe('createBuidling()', () => {

    const testName = 'test building';

    it('should return a building with no outline coordinates', () => {

      const { outdoorPOIFactory, testCoordinates } = testSetup();

      const testBuilding = outdoorPOIFactory.createBuilding(testName, testCoordinates, 'no outline');

      expect(testBuilding).toBeDefined();
    });

    it('should return buidling name and coordinates', () => {

      const { outdoorPOIFactory, testCoordinates } = testSetup(); 

      const testBuilding = outdoorPOIFactory.createBuilding(testName, testCoordinates, 'no outline');

      const testBuildingName = testBuilding.getName();
      const testBuildingCoordinates = testBuilding.getCoordinates();

      const testBuildingLat = testBuildingCoordinates.getLatitude();
      const testBuildingLng = testBuildingCoordinates.getLongitude();
      const testBuildingFloorNumber = testBuildingCoordinates.getFloorNumber();

      expect(testBuildingCoordinates).toEqual(testCoordinates);
      expect(testBuildingName).toEqual(testName);

      expect(testBuildingLat).toEqual(0);
      expect(testBuildingLng).toEqual(0);
      expect(testBuildingFloorNumber).toEqual(0);
    });
  });

  describe('createCampus()', () => {

    const testName = "test campus"

    it('should return a campus with no buildings', () => {

      const { outdoorPOIFactory, testCoordinates } = testSetup();

      const testCampus = outdoorPOIFactory.createCampus(testName, testCoordinates, []);

      expect(testCampus).toBeDefined();
    });

    it('should return campus name and coordinates', () => {

      const { outdoorPOIFactory, testCoordinates } = testSetup(); 

      const testCampus = outdoorPOIFactory.createCampus(testName, testCoordinates, []);

      const testCampusCoordinates = testCampus.getCoordinates();
      const testCampusName = testCampus.getName();

      expect(testCampusCoordinates).toEqual(testCoordinates);
      expect(testCampusName).toEqual(testName);
    });
  });

  describe('loadCampuses()', () => {

    class MockMaps extends google.maps.Map {
      addListener() {
          return null;
      }
    }

    it('should create the campuses and buildings', () => {

      const { outdoorPOIFactory } = testSetup();
      const mockMap = new MockMaps(null);

      const campuses = outdoorPOIFactory.loadCampuses(mockMap);
      const campus = campuses[0]; 
      const buildings = campus.getBuildings();

      expect(campuses).toBeDefined();
      expect(buildings).toBeDefined();
    });
  });
});
