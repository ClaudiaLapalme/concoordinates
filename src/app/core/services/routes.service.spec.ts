import { TestBed } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import { Coordinates, TransportMode, Transport, RouteStep } from '../models';

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
    spyOn(service,'mapGoogleStepsToRouteSteps')
    spyOn(service,'mapGoogleRoutesToRoutes')
    spyOn(service,'getPathFromLatLngList')

    service.getMappedRoutes(gRequestMock).then(function(result) {
      expect(service.mapGoogleStepsToRouteSteps).toHaveBeenCalled();
      expect(service.mapGoogleRoutesToRoutes).toHaveBeenCalled();
      expect(service.getPathFromLatLngList).toHaveBeenCalled();
      done();
    });
  });

  it('Should convert LatLng list to a list of Coordinates', () =>{
    let testLatLng = jasmine.createSpyObj('testLatLng',{
      'lat': 6,
      'lng': 7
    })

    let testLatLngs = [testLatLng,testLatLng]
    let testCoord = new Coordinates(6,7);
    let testCoords = [testCoord,testCoord]
    expect(service.getPathFromLatLngList(testLatLngs)).toEqual(testCoords)
    expect(testLatLng.lat).toHaveBeenCalledTimes(2);
    expect(testLatLng.lng).toHaveBeenCalledTimes(2);
  });

  it('Should convert gSteps to Route Steps', () =>{
    let mockTravelMode:any = jasmine.createSpyObj('mockTravelMode',{
      'toString': "TRANSIT"
    })
    let testLatLng = jasmine.createSpyObj('testLatLng',{
      'lat': 6,
      'lng': 7
    })
    let mockStep:google.maps.DirectionsStep = {
      steps: [],
      distance: {text:'text',value: 7},
      duration: {text:'text',value: 7},
      end_location: testLatLng,
      instructions: "instructions",
      path: [testLatLng,testLatLng],
      start_location: testLatLng,
      transit: null,
      travel_mode: mockTravelMode
    };

    let expectedRoute = new RouteStep(
      mockStep.distance.value,
      new Coordinates(
        mockStep.start_location.lat(),
        mockStep.start_location.lng()
      ),
      new Coordinates(mockStep.end_location.lat(), mockStep.end_location.lng()),
      [new Coordinates(6,7),new Coordinates(6,7)],
      Math.ceil(mockStep.duration.value/60),
      mockStep.instructions,
      new Transport(null, null, TransportMode[mockStep.travel_mode.toString()], mockStep.transit)
    );
    
    let mockSteps = [mockStep,mockStep]
    expect(service.mapGoogleStepsToRouteSteps(mockSteps)).toEqual([expectedRoute,expectedRoute])
  })
});
