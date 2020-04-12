import { Component, Input, OnInit } from '@angular/core';
import { RouteStep } from 'src/app/core/models/route-step';
import { TransportMode } from 'src/app/core/models/transport-mode';
import { isNull } from 'util';

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
            console.log(this.step.instruction);
            if (isNull(this.step.instruction)) {
                this.indoorRouteInstructionGeneration();
            }
        }
    }

    private indoorRouteInstructionGeneration(): void {
        if (this.step.transport.travelType === 'WALKING') {
            this.instruction = 'Walk';
        } else if (this.step.transport.travelType === 'STAIRS') {
            this.instruction = 'Take the stairs towards your destination floor';
        } else if (this.step.transport.travelType === 'ESCALATOR') {
            this.instruction = 'Take escalator towards your destination floor';
        } else if (this.step.transport.travelType === 'ELEVATOR') {
            this.instruction = 'Take elevator towards your destination floor';
        }
    }
}
