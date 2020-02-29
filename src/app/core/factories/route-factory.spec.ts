import { RouteFactory } from "./route-factory";
import { RoutesService } from "../services/routes.service";
import { TransportMode } from '../models/transport-mode';
import { TestBed } from '@angular/core/testing';
import { MockData } from 'src/app/shared/test-mock-data';

describe("RouteFactory", () => {
  let mockData = new MockData();
  let mockService: RoutesService;
  let routeFactory: RouteFactory;
  beforeEach(async () => TestBed.configureTestingModule({}));
  beforeEach( () =>{
    mockService = jasmine.createSpyObj('mockService',['getMappedRoutes']);
    routeFactory = new RouteFactory(mockService);
    mockData = new MockData();
  });


  it("should create factory", () => {
    expect(routeFactory).toBeTruthy();
  });

  it('Should call routes service with a directions request',() =>{
    routeFactory.generateDefaultRoutes(mockData.startCoordinates,mockData.endCoordinates,
      mockData.startTimeAsDate, mockData.endTimeAsDate, mockData.testTransportModeDriving);
    expect(mockService.getMappedRoutes).toHaveBeenCalledWith(mockData.getTestDirectionsRequest())
  })

  it('Should return null when calling generateAccessibleRoutes', () => {
    expect(routeFactory.generateAccesibleRoutes(null,null,null,null)).toEqual(null);
  })
});
