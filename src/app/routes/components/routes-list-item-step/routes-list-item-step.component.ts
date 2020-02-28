import { Component, OnInit, Input } from '@angular/core';
import { RouteStep, TransportMode } from 'src/app/core';


@Component({
  selector: 'app-routes-list-item-step',
  templateUrl: './routes-list-item-step.component.html',
  styleUrls: ['./routes-list-item-step.component.scss'],
})
export class RoutesListItemStepComponent implements OnInit {

  @Input() step: RouteStep;
  @Input() routeTransportMode ?: TransportMode;

  constructor() { }

  ngOnInit() {        
  }

}
