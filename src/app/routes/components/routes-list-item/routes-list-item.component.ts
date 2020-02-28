import { Component, OnInit, Input } from '@angular/core';
import { Route } from 'src/app/core/models/route';
import { TransportMode } from 'src/app/core/models/transport-mode';

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
