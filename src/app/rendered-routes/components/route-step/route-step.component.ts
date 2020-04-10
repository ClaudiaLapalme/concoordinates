import { Component, Input, OnInit } from '@angular/core';
import { RouteStep } from 'src/app/core/models/route-step';

@Component({
    selector: 'app-route-step',
    templateUrl: './route-step.component.html',
    styleUrls: ['./route-step.component.scss']
})
export class RouteStepComponent implements OnInit {
    @Input() step: RouteStep;

    stepDuration: number;
    stepDistance: number;
    constructor() {}

    ngOnInit() {
        console.log('hello dawg');
        console.log(this.step);
        this.stepDistance = this.step.getDistance();
        this.stepDuration = this.step.getDuration();
    }
}
