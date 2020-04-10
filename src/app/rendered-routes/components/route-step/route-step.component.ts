import { Component, Input, OnInit } from '@angular/core';
import { RouteStep } from 'src/app/core/models/route-step';
import { Transport } from 'src/app/core/models/transport-mode';

@Component({
    selector: 'app-route-step',
    templateUrl: './route-step.component.html',
    styleUrls: ['./route-step.component.scss']
})
export class RouteStepComponent implements OnInit {
    @Input() step: RouteStep;

    stepDuration: number;
    routeTransportMode: String;
    instruction: String;
    constructor() {}

    ngOnInit() {
        this.routeTransportMode = 'TRANSIT';
        this.instruction = this.step.instruction;
        console.log('hello dawg');
        console.log(this.step);
        this.stepDuration = this.step.getDuration();
    }
}
