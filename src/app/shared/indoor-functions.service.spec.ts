import { TestBed } from '@angular/core/testing';
import { Coordinates } from '../core';
import { IndoorFunctionsService } from './indoor-functions.service';

describe('IndoorFunctionsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
        expect(service).toBeTruthy();
    });

    it('should find location in the indoor coordinates', () => {
        const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
        const indoorCoord = 'H811';
        expect(service.coordinateIsIndoors(indoorCoord)).toBeTruthy();
    });

    it('should NOT find location in the indoor coordinates', () => {
        const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
        const outdoorCoord = 'outdoor Location';
        expect(service.coordinateIsIndoors(outdoorCoord)).toBeFalsy();
    });

    it('should not find outdoorLocations in the indoor coordinates', () => {
        const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
        const outdoorStart = 'notIndoors';
        const outdoorEnd = 'notIndoors2';
        expect(service.bothCoordinatesMatchIndoorParams(outdoorStart, outdoorEnd)).toBeFalsy();
    });

    it('should return a coordinate from an indoor poi', () => {
        const service: IndoorFunctionsService = TestBed.get(IndoorFunctionsService);
        const indoorPoint = 'H811';
        const correspondingCoordinate = new Coordinates(45.49707097, -73.57873513, 8);
        expect(service.getIndoorCoordinate(indoorPoint)).toEqual(correspondingCoordinate);
    });
});
