import { async, TestBed } from "@angular/core/testing";
import { RouteFactory } from "./route-factory";
import { RoutesService } from "./routes.service";

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
});
