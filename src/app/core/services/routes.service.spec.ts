import { TestBed } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import { Coordinates } from '../models';

describe('RoutesService', () => {

  let gRequestMock: google.maps.DirectionsRequest;
  let service: RoutesService;

  beforeEach(async() => TestBed.configureTestingModule({
  }));

  beforeEach(()=> {
   gRequestMock = jasmine.createSpyObj('gRequest',['somemethod']);
    service = TestBed.get(RoutesService);
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Should call all underlying methods at least once', done =>{
    service.getMappedRoutes(gRequestMock).then(()=> done());
    expect(service.mapGoogleStepsToRouteSteps).toHaveBeenCalled();
    expect(service.mapGoogleRoutesToRoutes).toHaveBeenCalled();
    expect(service.getPathFromLatLngList).toHaveBeenCalled();
  });

  // it('Should convert LatLng list to a list of Coordinates', () =>{
  //   let testLatLng = new google.maps.LatLng(6,7);
  //   let testLatLngs = [testLatLng,testLatLng]
  //   let testCoord = new Coordinates(6,7);
  //   let testCoords = [testCoord,testCoord]
  //   expect(routeUnderTest.getPathFromLatLngList(testLatLngs)).toEqual(testCoords)
  // });

  // it('Should convert gSteps to Route Steps', () =>{
  //   // routeUnderTest.mapGoogleStepsToRouteSteps()
  // })
});
