import { Component, OnInit, Input } from '@angular/core';
import { Route } from '../routes-list/routes-list.component';

@Component({
  selector: 'app-routes-list-item',
  templateUrl: './routes-list-item.component.html',
  styleUrls: ['./routes-list-item.component.scss'],
})
export class RoutesListItemComponent implements OnInit {

  @Input() route: Route;
  @Input() routeNumber: number;
  constructor() { }

  ngOnInit() {
  }

}
