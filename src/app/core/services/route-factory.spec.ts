import { RouteFactory } from "./route-factory";
import { RoutesService } from "./routes.service";
import { TransportMode } from '../models/transport-mode';

describe("RouteFactory", () => {
  it("should create factory", () => {
    const routeFactory = new RouteFactory(new RoutesService());
    expect(routeFactory).toBeTruthy();
  });

  // it("should return error", () => {
  //   const routeFactory = new RouteFactory(new RoutesService());
  //   expect(routeFactory.generateDefaultRoutes(null, null, null, null, "apple")
  //     .then(res => res))
  //     .toThrowError("Invalid Transitmode type used");
  // });

  it('Should call routes service with a directions request',() =>{
    const mockService: RoutesService = jasmine.createSpyObj('mockService',['getMappedRoutes'])
    const routeFactory = new RouteFactory(mockService);
    let startCoordinates = "Loyla"
    let endCoordinates = "Ohio"
    let startTime:Date = new Date(3);
    let endTime:Date = new Date(5);
    let transportMode = TransportMode.DRIVING
    routeFactory.generateDefaultRoutes(startCoordinates,endCoordinates, startTime, endTime, transportMode)
    let dirRequest: google.maps.DirectionsRequest = {
      origin: startCoordinates.toString(),
      destination: endCoordinates.toString(),
      travelMode: google.maps.TravelMode['DRIVING'],
      transitOptions: { departureTime: startTime, arrivalTime: endTime },
      provideRouteAlternatives: true
    };

    expect(mockService.getMappedRoutes).toHaveBeenCalledWith(dirRequest)
  })
});
