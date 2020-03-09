import { Component, Input, OnInit } from "@angular/core";
import { Route, TransportMode } from "src/app/core";

@Component({
  selector: "app-routes-list",
  templateUrl: "./routes-list.component.html",
  styleUrls: ["./routes-list.component.scss"]
})
export class RoutesListComponent implements OnInit {
  @Input() routes: Route[];
  @Input() routeTransportMode: TransportMode;
  constructor() {}

  ngOnInit() {}
  displayRoute(i: number) {
    const selectedRoute = this.routes[i];
    console.log(selectedRoute);

    // redirect to other page and send route along with it
  }
}
