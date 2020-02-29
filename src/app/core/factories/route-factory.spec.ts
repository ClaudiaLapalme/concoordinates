import { RouteFactory } from "./route-factory";
import { RoutesService } from "../services/routes.service";
import { TransportMode } from '../models/transport-mode';
import { TestBed } from '@angular/core/testing';

describe("RouteFactory", () => {
  
  let mockService: RoutesService;
  let routeFactory: RouteFactory;
  beforeEach(async () => TestBed.configureTestingModule({}));
  beforeEach( () =>{
    mockService = jasmine.createSpyObj('mockService',['getMappedRoutes']);
    routeFactory = new RouteFactory(mockService);
  });


  it("should create factory", () => {
    const routeFactory = new RouteFactory(new RoutesService());
    expect(routeFactory).toBeTruthy();
  });

  it('Should call routes service with a directions request',() =>{
    let startCoordinates = "Loyla"
    let endCoordinates = "Ohio"
    let startTime:Date = new Date(3);
    let endTime:Date = new Date(5);
    let transportMode:any = jasmine.createSpyObj('transportMode',{
      'toString': 'DRIVING'
    });
    routeFactory.generateDefaultRoutes(startCoordinates,endCoordinates, startTime, endTime, transportMode);
    let dirRequest: google.maps.DirectionsRequest = {
      origin: startCoordinates.toString(),
      destination: endCoordinates.toString(),
      travelMode: transportMode,
      transitOptions: { departureTime: startTime, arrivalTime: endTime },
      provideRouteAlternatives: true
    };

    expect(mockService.getMappedRoutes).toHaveBeenCalledWith(dirRequest)
  })

  it('Should return null when calling generateAccessibleRoutes', () => {
    expect(routeFactory.generateAccesibleRoutes(null,null,null,null)).toEqual(null);
  })
});
