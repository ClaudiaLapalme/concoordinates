import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { RouteFactory } from "../core/services/route-factory";
import { Coordinates } from "../core/models/coordinates";
import { Route } from '../core/models/route';

@Component({
  selector: "app-routes",
  templateUrl: "./routes.page.html",
  styleUrls: ["./routes.page.scss"]
})
export class RoutesPage implements OnInit {
  from: string;
  to: string;

  form: FormGroup;

  startCoord = new Coordinates(45.4867157, -73.5772517);
  endCoord = new Coordinates(45.5138, -73.6829);

  routes: Route[];

  constructor(
    private formBuilder: FormBuilder,
    private routeFactory: RouteFactory
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      from: ["Concordia University"],
      to: ["Cote Vertu"],
      departAt: ["Depart At"],
      time: ["18:00"]
    });
    this.logRoute();
  }

  getRoutes(transportMode: string) {
    console.log(transportMode);
  }
  async logRoute() {
    // let startCoord = new Coordinates(45.4867157, -73.5772517);
    // let endCoord = new Coordinates(45.485007, -73.415853);
    let startTime = new Date(2020, 1, 21, 6, 55, 0);
      this.routes = await this.routeFactory.generateDefaultRoutes(
      this.startCoord,
      this.endCoord,
      startTime,
      null,
      google.maps.TravelMode.TRANSIT
    )
    console.log(this.routes);
    
  }
}
