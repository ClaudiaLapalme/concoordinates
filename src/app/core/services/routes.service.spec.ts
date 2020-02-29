import { TestBed } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import { MockData } from '../../shared/test-mock-data'

describe('RoutesService', () => {

  let mockData = new MockData();
  let service: RoutesService;

  beforeEach(async() => TestBed.configureTestingModule({
  }));

  beforeEach(()=> {
   service = TestBed.get(RoutesService);
   mockData = new MockData();
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  xit('Should call all underlying methods at least once', done =>{
    spyOn(service,'mapGoogleStepsToRouteSteps')
    spyOn(service,'mapGoogleRoutesToRoutes')
    spyOn(service,'getPathFromLatLngList')

    service.getMappedRoutes(mockData.getTestDirectionsRequest()).then(function(result) {
      expect(service.mapGoogleStepsToRouteSteps).toHaveBeenCalled();
      expect(service.mapGoogleRoutesToRoutes).toHaveBeenCalled();
      expect(service.getPathFromLatLngList).toHaveBeenCalled();
      done();
    });
  });

  it('Should convert LatLng list to a list of Coordinates', () =>{
    expect(service.getPathFromLatLngList(mockData.getTestListOfGoogleLatLngs())).toEqual(mockData.getTestListOfCoordinates())
    expect(mockData.testGoogleLatLng.lat).toHaveBeenCalledTimes(2);
    expect(mockData.testGoogleLatLng.lng).toHaveBeenCalledTimes(2);
  });

  it('Should convert gSteps to Route Steps', () =>{
    expect(service.mapGoogleStepsToRouteSteps(mockData.getTestDirectionsSteps())).toEqual(mockData.getTestRouteSteps())
  })

  it('Should convert gRoutes to Routes', () => {
    expect(service.mapGoogleRoutesToRoutes(mockData.getTestDirectionsRoutes()).length).toBe(2);
    expect(service.mapGoogleRoutesToRoutes(mockData.getTestDirectionsRoutes())[0]).toEqual(mockData.getTestRoute())
  });
});
