import { TestBed } from '@angular/core/testing';
import { Coordinates, RouteStep, TransportMode, Transport } from '../core';
import { IndoorFunctionsService } from './indoor-functions.service';
import { ShortestPathResult } from './shortest-path-algorithm';

describe('IndoorFunctionsService', () => {
    let service: IndoorFunctionsService;

    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        service = TestBed.get(IndoorFunctionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should find location in the indoor coordinates', () => {
        const indoorCoord = 'H811';
        expect(service.coordinateIsIndoors(indoorCoord)).toBeTruthy();
    });

    it('should NOT find location in the indoor coordinates', () => {
        const outdoorCoord = 'outdoor Location';
        expect(service.coordinateIsIndoors(outdoorCoord)).toBeFalsy();
    });

    it('should not find outdoorLocations in the indoor coordinates', () => {
        const outdoorStart = 'notIndoors';
        const outdoorEnd = 'notIndoors2';
        expect(service.bothCoordinatesMatchIndoorParams(outdoorStart, outdoorEnd)).toBeFalsy();
    });

    it('should return a coordinate from an indoor poi', () => {
        const indoorPoint = 'H811';
        const correspondingCoordinate = new Coordinates(45.49707097, -73.57873513, 8);
        expect(service.getIndoorCoordinate(indoorPoint)).toEqual(correspondingCoordinate);
    });

    it('should throw an error for an unexpected an indoor poi', () => {
        const indoorPoint = 'H1007';
        expect(() => { service.getIndoorCoordinate(indoorPoint); }).toThrowError(indoorPoint + '  is not an indoor coordinate');
    });

    it('should find the shortest disabled path in the adjacency matrix', () => {
        const startLocation = 'H962';
        const endLocation = 'H841';
        const disabled = true;
        const expectedShortestPath: ShortestPathResult = {
            distance: 40,
            path: ['H962', 'H9-W25', 'H9-E', 'H8-E', 'H8-W18', 'H8-W19', 'H8-W20', 'H8-W21', 'H8-W38', 'H8-W34', 'H8-W35', 'H841']
        };
        expect(service.shortestPath(startLocation, endLocation, disabled)).toEqual(expectedShortestPath);
    });

    it('should find the shortest non disabled path in the adjacency matrix', () => {
        const startLocation = 'H962';
        const endLocation = 'H841';
        const disabled = false;
        const expectedShortestPath: ShortestPathResult = {
            distance: 20,
            path: ['H962', 'H9-W25', 'H9-W26', 'H9-ESC8D', 'H8-ESC9D', 'H8-W40', 'H8-W39', 'H8-W38', 'H8-W34', 'H8-W35', 'H841']
        };
        expect(service.shortestPath(startLocation, endLocation, disabled)).toEqual(expectedShortestPath);
    });

    it('should throw an error if no path is found', () => {
        const startLocation = 'H962';
        const endLocation = 'nowhereland';
        const disabled = false;
        expect(() => { service.shortestPath(startLocation, endLocation, disabled) }).toThrowError();
    });

    it('should remove escalators and elevators from disability adjacency matrix', () => {
        const disabilityAdjMatrix = service.getDisabilityAdjacencyMatrix();
        expect(disabilityAdjMatrix['H1-ESC2D']).toBeUndefined();
        expect(disabilityAdjMatrix['H9-S4']).toBeUndefined();
    });

    it('should map string path to an array of RouteSteps', () => {
        const path = ['H859', 'H8-W06', 'H8-W17', 'H8-S4', 'H9-S4'];
        const expectedWalkingRouteStep: RouteStep = new RouteStep(
            6,
            service.getIndoorCoordinate('H859'),
            service.getIndoorCoordinate('H8-S4'),
            [service.getIndoorCoordinate('H859'), service.getIndoorCoordinate('H8-W06'),
            service.getIndoorCoordinate('H8-W17'), service.getIndoorCoordinate('H8-S4')],
            Math.ceil(6 / 20),
            null,
            new Transport(null, null, TransportMode.WALKING, null)
        );

        const expectedStairsRouteStep: RouteStep = new RouteStep(
            15,
            service.getIndoorCoordinate('H8-S4'),
            service.getIndoorCoordinate('H9-S4'),
            [service.getIndoorCoordinate('H8-S4'), service.getIndoorCoordinate('H9-S4')],
            Math.ceil(15 / 20),
            null,
            new Transport(null, null, TransportMode.STAIRS, null)
        );
        const expectedRouteSteps: RouteStep[] = [expectedWalkingRouteStep, expectedStairsRouteStep];
        expect(service.mapPathToRouteSteps(path)).toEqual(expectedRouteSteps);

    });
});
