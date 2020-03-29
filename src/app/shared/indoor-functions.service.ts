import { Injectable } from '@angular/core';
import adjacencyMatrix from '../core/data/adjacency-matrix.json';
import indoorPoiToCoordinates from '../core/data/indoor-poi-to-coordinates.json';
import indoorWalkingPathCoordinates from '../core/data/indoor-walking-path-coordinates.json';
import {
    AdjacencyMatrix,
    Coordinates,
    IndoorCoordinates,
    IndoorRoute,
    RouteStep,
    Transport,
    TransportMode,
} from '../core/models';
import { Dijkstra, ShortestPathResult } from './shortest-path-algorithm';


@Injectable({
    providedIn: 'root'
})
export class IndoorFunctionsService {

    private adjMatrix: AdjacencyMatrix = adjacencyMatrix;
    private indoorPoiToCoords: IndoorCoordinates =
        Object.assign({}, indoorPoiToCoordinates, indoorWalkingPathCoordinates);

    constructor() { }

    /**
     * Find the shortest path using an adjacency matrix, a start position,
     * and an end position.
     */
    shortestPath(startpos: string, endpos: string, disability = false): ShortestPathResult {
        // Add a finish connection to indicate where the algorithm should stop.
        let treatedAdjacencyMatrix;
        if (disability) {
            treatedAdjacencyMatrix = Object.assign({}, this.getDisabilityAdjacencyMatrix());
        } else {
            treatedAdjacencyMatrix = Object.assign({}, this.adjMatrix);
        }

        const shortestPathAlgo = new Dijkstra();
        const results: ShortestPathResult = shortestPathAlgo.computeShortestPath(treatedAdjacencyMatrix, startpos, endpos);

        // remove the finish (last) location
        results.path.pop();
        // add the start location in the path
        results.path.unshift(startpos);

        return results;
    }


    /**
     * Validates that both of the coordinates are part of the indoor pois
     * @param startCoordinates string representation of the start coordinate
     * @param endCoordinates string representation of the end coordinate
     */
    bothCoordinatesMatchIndoorParams(startCoordinates: string, endCoordinates: string): boolean {
        return (this.coordinateIsIndoors(startCoordinates) && this.coordinateIsIndoors(endCoordinates));
    }

    /**
     * Converts a coordinate name string to a coordinate object.
     * @param coordinateName a string representing the coordinate e.g. "H811"
     */
    getIndoorCoordinate(coordinateName: string): Coordinates {
        if (!this.coordinateIsIndoors(coordinateName)) {
            throw new Error(coordinateName + '  is not an indoor coordinate');
        }

        return new Coordinates(
            +this.indoorPoiToCoords[coordinateName].lat,
            +this.indoorPoiToCoords[coordinateName].lng,
            +this.indoorPoiToCoords[coordinateName].fN
        );
    }

    coordinateIsIndoors(coordinate: string): boolean {
        return !!this.indoorPoiToCoords[coordinate];
    }

    /**
     * Pre processing of an adjacency matrix to remove unaccessible nodes
     * for disability mode (stairs and escalators).
     */
    getDisabilityAdjacencyMatrix(): AdjacencyMatrix {
        const disabilityAdjacency: AdjacencyMatrix = Object.assign({}, this.adjMatrix);
        const escalatorRegex: RegExp = /\w+\d+-ESC\d+[D|U]/;
        const stairsRegex: RegExp = /\w+\d+-S\d+/;
        for (const coord in disabilityAdjacency) {
            if (coord.match(escalatorRegex) || coord.match(stairsRegex)) {
                delete disabilityAdjacency[coord];
            }
        }
        return disabilityAdjacency;
    }

    /**
     * Map an array of string coordinate names representing a path
     * to an array of RouteSteps.
     * @param path array of coordinate names
     */
    mapPathToRouteSteps(path: string[]): RouteStep[] {
        // group paths by indoor transport types (escalators, stairs, walking, elevators)
        const pathSegments: string[][] = this.groupPathByIndoorTransportMode(path);

        // for each group create a route step
        const routeSteps: RouteStep[] = [];
        for (const segment of pathSegments) {
            routeSteps.push(this.mapPathSegmentToRouteStep(segment));
        }

        return routeSteps;
    }

    /**
     * Map an array of string coordinate names representing a path
     * having only one type of TransportMode to one RouteStep.
     * @param pathSegment array of coordinate names
     */
    private mapPathSegmentToRouteStep(pathSegment: string[]): RouteStep {

        let segmentDistance = 0;
        for (let i = 0; i < pathSegment.length - 1; i++) {
            segmentDistance += this.adjMatrix[pathSegment[i]][pathSegment[i + 1]];
        }

        return new RouteStep(
            segmentDistance,
            this.getIndoorCoordinate(pathSegment[0]),
            this.getIndoorCoordinate(pathSegment[pathSegment.length - 1]),
            this.pathToCoordinates(pathSegment),
            Math.ceil(segmentDistance / 20),
            null,
            new Transport(
                null,
                null,
                this.coordinateNameIndoorTransportMode(pathSegment[0]),
                null,
            )
        );
    }


    /**
     * Converts a string array of coordinate names to a Coordinates array.
     * @param path a string array of coordinate names
     */
    private pathToCoordinates(path: string[]): Coordinates[] {
        const coordinates: Coordinates[] = [];
        for (const coordName of path) {
            coordinates.push(this.getIndoorCoordinate(coordName));
        }
        return coordinates;
    }

    /**
     * Gets the TransportMode based on the coordinate name format.
     * @param coordinateName a coordinate name e.g. H815
     */
    private coordinateNameIndoorTransportMode(coordinateName: string): TransportMode {
        const indoorpoiRegex: RegExp = /^\w+\d+$/;
        const hallwayRegex: RegExp = /^\w+\d+-W\d+$/;
        const stairsRegex: RegExp = /^\w+\d+-S\d+$/;
        const escalatorRegex: RegExp = /^\w+\d+-ESC\d+[U|D]$/;
        const elevatorRegex: RegExp = /^\w+\d+-E$/;

        if (indoorpoiRegex.test(coordinateName) || hallwayRegex.test(coordinateName)) {

            return TransportMode.WALKING;

        } else if (stairsRegex.test(coordinateName)) {

            return TransportMode.STAIRS;

        } else if (escalatorRegex.test(coordinateName)) {

            return TransportMode.ESCALATOR;

        } else if (elevatorRegex.test(coordinateName)) {

            return TransportMode.ELEVATOR;

        }

        return null;
    }

    /**
     * Create sub groups for each travel type by splitting the path into many.
     * @param path a string array of coordinate names
     */
    private groupPathByIndoorTransportMode(path: string[]): string[][] {
        const groupedPaths: string[][] = [];
        let coordinateType = this.coordinateNameIndoorTransportMode(path[0]);

        let currentGroupIndex = 0;
        groupedPaths[currentGroupIndex] = [];

        for (const coordinateName of path) {

            const nextCoordinateType = this.coordinateNameIndoorTransportMode(coordinateName);

            if (coordinateType === nextCoordinateType) {

                groupedPaths[currentGroupIndex].push(coordinateName);

            } else {
                // push coordinate of next segment as well
                groupedPaths[currentGroupIndex].push(coordinateName);

                coordinateType = nextCoordinateType;
                currentGroupIndex++;
                groupedPaths[currentGroupIndex] = [coordinateName];

            }
        }
        return groupedPaths;

    }

    algoResultsToIndoorRoute(
        algoResults: ShortestPathResult[],
        startLocation: string,
        endLocation: string,
        disability: boolean,
    ) {
        const indoorRoutes: IndoorRoute[] = [];
        algoResults.forEach(algoResult => {
            indoorRoutes.push(
                new IndoorRoute(
                    startLocation,
                    endLocation,
                    disability,
                    this.mapPathToRouteSteps(algoResult.path),
                    algoResult.distance));

        });
        // last option is disability friendly
        indoorRoutes[indoorRoutes.length - 1].disability = true;
        return indoorRoutes;
    }
}
