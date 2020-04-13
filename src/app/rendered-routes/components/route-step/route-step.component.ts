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
    @Input() nextStep: RouteStep;
    @Input() routeTransportMode: TransportMode;

    stepDuration: number;
    instruction: string;

    constructor() {}

    ngOnInit() {
        // if there is an input step get its instructions and duration
        if (this.step) {
            console.log(this.step.instruction);
            this.stepDuration = this.step.getDuration();
            if (isNull(this.step.instruction)) {
                this.indoorRouteInstructionGeneration();
            }

            // Some instructions have html still inside
            this.instruction = this.instruction.replace(/<\/?[^>]+(>|$)/g, '');
        }
    }

    private indoorRouteInstructionGeneration(): void {
        if (this.step.transport.travelType === 'WALKING') {
            this.instruction = `Walk along the ${this.step.startCoordinate.getFloorNumber()}th floor`;
        } else if (this.step.transport.travelType === 'STAIRS') {
            const floorNumber: number = this.step.startCoordinate.getFloorNumber();
            const floorNumberNext: number = this.nextStep.startCoordinate.getFloorNumber();
            this.instruction = `Take the stairs from the ${floorNumber}th floor to the ${floorNumberNext}th floor`;
        } else if (this.step.transport.travelType === 'ESCALATOR') {
            const floorNumber: number = this.step.startCoordinate.getFloorNumber();
            const floorNumberNext: number = this.nextStep.startCoordinate.getFloorNumber();
            this.instruction = `Take the escalator from the ${floorNumber}th floor to the ${floorNumberNext}th floor`;
        } else if (this.step.transport.travelType === 'ELEVATOR') {
            const floorNumber: number = this.step.startCoordinate.getFloorNumber();
            const floorNumberNext: number = this.nextStep.startCoordinate.getFloorNumber();
            this.instruction = `Take the elevator from the ${floorNumber}th floor to the ${floorNumberNext}th floor`;
        }
    }
}
