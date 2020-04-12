import { Component, Input, OnInit } from '@angular/core';
import { RouteStep } from 'src/app/core/models/route-step';
import { Transport, TransportMode } from 'src/app/core/models/transport-mode';

@Component({
    selector: 'app-route-step',
    templateUrl: './route-step.component.html',
    styleUrls: ['./route-step.component.scss'],
})
export class RouteStepComponent implements OnInit {
    @Input() step: RouteStep;
    @Input() routeTransportMode: TransportMode;

    stepDuration: number;
    instruction: string;

    constructor() {}

    ngOnInit() {
        // if there is an input step get its instructions and duration
        if (this.step) {
            this.instruction = this.step.instruction;
            this.stepDuration = this.step.getDuration();
        }
    }
}
