import { Component, OnInit, Input } from '@angular/core';
import { RouteStep } from 'src/app/core/models/route-step';

@Component({
  selector: 'app-routes-list-item-step',
  templateUrl: './routes-list-item-step.component.html',
  styleUrls: ['./routes-list-item-step.component.scss'],
})
export class RoutesListItemStepComponent implements OnInit {

  @Input() step: RouteStep;

  constructor() { }

  ngOnInit() {    
  }

}
