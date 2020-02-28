import { Component, OnInit, Input } from '@angular/core';
import { TransportMode, Route } from 'src/app/core';


@Component({
  selector: 'app-routes-list-item',
  templateUrl: './routes-list-item.component.html',
  styleUrls: ['./routes-list-item.component.scss'],
})
export class RoutesListItemComponent implements OnInit {

  @Input() route: Route;
  @Input() routeNumber: number;
  @Input() routeTransportMode: TransportMode

  routeDuration: number;
  constructor() { }

  ngOnInit() {
    if(this.route){
      this.routeDuration = this.route.computeTotalDuration();
    }
  }

}
