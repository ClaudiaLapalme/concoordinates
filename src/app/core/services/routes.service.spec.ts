import { TestBed } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import { Coordinates } from '../models';

describe('RoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));


  // var gResultMock: google.maps.DirectionsResult = jasmine.createSpyObj('gResult',[]);
  var gRequestMock: google.maps.DirectionsRequest = jasmine.createSpyObj('gRequest',['somemethod']);

  it('should be created', () => {
    const service: RoutesService = TestBed.get(RoutesService);
    expect(service).toBeTruthy();
  });

  const routeUnderTest: RoutesService = TestBed.get(RoutesService);

  it('Should call all underlying methods at least once', () =>{
    routeUnderTest.getMappedRoutes(gRequestMock);
    expect(routeUnderTest.mapGoogleStepsToRouteSteps).toHaveBeenCalled();
    expect(routeUnderTest.mapGoogleRoutesToRoutes).toHaveBeenCalled();
    expect(routeUnderTest.getPathFromLatLngList).toHaveBeenCalled();
  });

  it('Should convert LatLng list to a list of Coordinates', () =>{
    let testLatLng = new google.maps.LatLng(6,7);
    let testLatLngs = [testLatLng,testLatLng]
    let testCoord = new Coordinates(6,7);
    let testCoords = [testCoord,testCoord]
    expect(routeUnderTest.getPathFromLatLngList(testLatLngs)).toEqual(testCoords)
  });

  it('Should convert gSteps to Route Steps', () =>{
    // routeUnderTest.mapGoogleStepsToRouteSteps()
  })
});
