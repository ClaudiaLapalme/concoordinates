import { Injectable } from '@angular/core';
import * as adjacencyMatrix from '../data/adjacency-matrix.json';
import * as indoorPoiToCoordinates from '../data/indoor-poi-to-coordinates.json';
import * as indoorWalkingPathCoordinates from '../data/indoor-walking-path-coordinates.json';
import {
    Coordinates,
    IndoorRoute,
    OutdoorRoute,
    RouteStep,
    Transport,
    TransportMode,
} from '../models';
import { GoogleApisService } from '../services/google-apis.service';
@Injectable({
    providedIn: 'root'
})
export class RoutesService {

    private moduleKey = 'default';
    private adjMatrix: AdjacencyMatrix = adjacencyMatrix[this.moduleKey];
    private indoorPoiToCoords: IndoorCoordinates = indoorPoiToCoordinates[this.moduleKey];
    private indoorWalkingPathCoords: IndoorCoordinates = indoorWalkingPathCoordinates[this.moduleKey];

    constructor(private googleApis: GoogleApisService) { }

    /*
    This function is responsible for calling the actual google api
    through our interface to query the google services for routing instructions
    */
    async getMappedRoutes(
        dirRequest: google.maps.DirectionsRequest
    ): Promise<any> {
        try {
            const res = await this.googleApis.getGoogleMapRoutes(dirRequest);
            return this.mapGoogleRoutesToRoutes(res.routes);
        } catch (error) {
            console.log(error);
        }
    }

    /*
    A conversion function responsible for mapping google routes to our OutdoorRoutes model
    Reference to google routes object structure:
    https://developers.google.com/maps/documentation/directions/intro#DirectionsResponses
    */
    mapGoogleRoutesToRoutes(
        googleRoutes: google.maps.DirectionsRoute[]
    ): OutdoorRoute[] {
        const routes: OutdoorRoute[] = [];
        googleRoutes.forEach(gRoute => {
            const routeLeg = gRoute.legs[0];

            const route = new OutdoorRoute(
                new Coordinates(
                    routeLeg.start_location.lat(),
                    gRoute.legs[0].start_location.lng(),
                    null
                ),
                new Coordinates(
                    routeLeg.end_location.lat(),
                    gRoute.legs[0].end_location.lng(),
                    null
                ),
                routeLeg.departure_time && routeLeg.departure_time.value
                    ? routeLeg.departure_time.value
                    : null,
                routeLeg.arrival_time && routeLeg.arrival_time.value
                    ? routeLeg.arrival_time.value
                    : null,
                null,
                this.mapGoogleStepsToRouteSteps(routeLeg.steps)
            );

            routes.push(route);
        });
        return routes;
    }

    /*
    A conversion function responsible for mapping google LatLng coordinates into our Coordinates model
    */
    getPathFromLatLngList(latLngList: google.maps.LatLng[]): Coordinates[] {
        const coordinatesList: Coordinates[] = [];
        latLngList.forEach(latlng => {
            const coordinate = new Coordinates(
                latlng.lat(),
                latlng.lng(),
                null
            );
            coordinatesList.push(coordinate);
        });
        return coordinatesList;
    }

    /*
    A conversion function to convert underlying leg steps of the google object into our routeSteps objects
    */
    mapGoogleStepsToRouteSteps(
        steps: google.maps.DirectionsStep[]
    ): RouteStep[] {
        const rSteps: RouteStep[] = [];
        steps.forEach(element => {
            const rStep = new RouteStep(
                element.distance.value,
                new Coordinates(
                    element.start_location.lat(),
                    element.start_location.lng(),
                    null
                ),
                new Coordinates(
                    element.end_location.lat(),
                    element.end_location.lng(),
                    null
                ),
                this.getPathFromLatLngList(element.path),
                Math.ceil(element.duration.value / 60),
                element.instructions,
                new Transport(
                    null,
                    null,
                    TransportMode[element.travel_mode.toString()],
                    element.transit
                )
            );

            rSteps.push(rStep);
        });
        return rSteps;
    }

    /**
     * Creates indoor routes for a start location, to an end location and always provides a disability
     * option at minimum.
     * @return an array of IndoorRoute
     */
    getIndoorRoutes(startLocation: string, endLocation: string, disability: boolean = false): IndoorRoute[] {
        if (startLocation === '' || endLocation === '') {
            throw new Error('start and end locations must not be empty');
        }

        const indoorRoutes: IndoorRoute[] = [];

        const normalShortestPath = this.shortestPath(this.adjMatrix, startLocation, endLocation);
        const disabilityShortestPath = this.shortestPath(this.getDisabilityAdjacencyMatrix(this.adjMatrix), startLocation, endLocation);

        console.log('shortestPath normal', normalShortestPath);
        console.log('shortestPath disability', disabilityShortestPath);

        const dijkstraResults: DijkstraResult[] = [];
        if (compare(normalShortestPath.path, disabilityShortestPath.path)) {
            dijkstraResults.push(disabilityShortestPath);
        } else {
            dijkstraResults.push(normalShortestPath, disabilityShortestPath);
        }

        dijkstraResults.forEach(dijkstraResult => {

            const startCoord: Coordinates = this.coordinateNameToCoordinates(startLocation);
            const endCoord: Coordinates = this.coordinateNameToCoordinates(endLocation);

            const path: string[] = dijkstraResult.path;
            // remove the finish (last) location
            path.pop();
            // add the start location in the path
            path.unshift(startLocation);

            indoorRoutes.push(
                new IndoorRoute(
                    startLocation,
                    endLocation,
                    disability,
                    this.mapPathToRouteSteps(path),
                    dijkstraResult.distance));

        });
        // last option is disability friendly
        indoorRoutes[indoorRoutes.length - 1].disability = true;
        console.log(indoorRoutes);
        return indoorRoutes;
    }

    /**
     * Converts a string array of coordinate names to a Coordinates array.
     * @param path a string array of coordinate names
     */
    private pathToCoordinates(path: string[]): Coordinates[] {
        const coordinates: Coordinates[] = [];
        for (const coordName of path) {
            coordinates.push(this.coordinateNameToCoordinates(coordName));
        }
        return coordinates;
    }

    /**
     * Converts a coordinate name string to a coordinate object.
     * @param coordinateName a string representing the coordinate e.g. "H811"
     */
    private coordinateNameToCoordinates(coordinateName: string): Coordinates {
        let storedCoordinate: StoredCoordinates = this.indoorPoiToCoords[coordinateName];
        if (!storedCoordinate) {
            storedCoordinate = this.indoorWalkingPathCoords[coordinateName];
        }
        return this.storedCoordinateToCoordinates(storedCoordinate);
    }

    /**
     * Converts a stored coordinate to a coordinate object.
     * @param storedCoordinate a StoredCoordinates
     */
    private storedCoordinateToCoordinates(storedCoordinate: StoredCoordinates): Coordinates {
        return new Coordinates(
            +storedCoordinate.lat,
            +storedCoordinate.lng,
            +storedCoordinate.fN);
    }

    /**
     * Map an array of string coordinate names representing a path
     * to an array of RouteSteps.
     * @param path array of coordinate names
     */
    private mapPathToRouteSteps(path: string[]): RouteStep[] {
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
        console.log(pathSegment);
        console.log(this.adjMatrix);
        console.log(this.indoorPoiToCoords);
        console.log(this.indoorWalkingPathCoords);

        let segmentDistance = 0;
        for (let i = 0; i < pathSegment.length - 1; i++) {
            segmentDistance += this.adjMatrix[pathSegment[i]][pathSegment[i + 1]];
        }

        return new RouteStep(
            segmentDistance,
            this.coordinateNameToCoordinates(pathSegment[0]),
            this.coordinateNameToCoordinates(pathSegment[pathSegment.length - 1]),
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
     * Helper method to find the node with the lowest cost for dijkstra.
     */
    private findLowestCostNode(costs: any, processed: any): string {
        const knownNodes = Object.keys(costs);

        const lowestCostNode = knownNodes.reduce((lowest: any, node: any) => {
            if (lowest === null && !processed.includes(node)) {
                lowest = node;
            }
            if (costs[node] < costs[lowest] && !processed.includes(node)) {
                lowest = node;
            }
            return lowest;
        }, null);

        return lowestCostNode;
    }

    /**
     * The dijkstra algorithm
     * Finds the shortest path with the shortest distance.
     * @return a DijkstraResult
     */
    private dijkstra(graphzz: AdjacencyMatrix, startElement: string): DijkstraResult {

        // track lowest cost to reach each node
        const trackedCosts = Object.assign(
            { finish: Infinity }, graphzz[startElement]
        );
        // track paths
        const trackedParents: any = { finish: null };
        const processedNodes: string[] = [];

        // Set initial node. Pick lowest cost node.
        let node: string = this.findLowestCostNode(trackedCosts, processedNodes);

        while (node) {
            const costToReachNode = trackedCosts[node];
            let childrenOfNode: Edge = graphzz[node];

            childrenOfNode = childrenOfNode ? childrenOfNode : {};
            for (const child of Object.keys(childrenOfNode)) {
                const costFromNodetoChild = childrenOfNode[child];
                const costToChild = costToReachNode + costFromNodetoChild;

                if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
                    trackedCosts[child] = costToChild;
                    trackedParents[child] = node;
                }
            }

            processedNodes.push(node);

            node = this.findLowestCostNode(trackedCosts, processedNodes);
        }

        const optimalPath: string[] = ['finish'];
        let parent = trackedParents.finish;
        while (parent) {
            optimalPath.push(parent);
            parent = trackedParents[parent];
        }
        optimalPath.reverse();

        const result: DijkstraResult = {
            distance: trackedCosts.finish,
            path: optimalPath
        };

        return result;
    }

    /**
     * Pre processing of an adjacency matrix to remove unaccessible nodes
     * for disability mode (stairs and escalators).
     */
    private getDisabilityAdjacencyMatrix(adjacency: AdjacencyMatrix): AdjacencyMatrix {
        const disabilityAdjacency: AdjacencyMatrix = Object.assign({}, adjacency);
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
     * Find the shortest path using an adjacency matrix, a start position,
     * and an end position.
     */
    private shortestPath(graphz: AdjacencyMatrix, startpos: string, endpos: string): DijkstraResult {
        // Add a finish connection to indicate where the algorithm should stop.
        graphz[endpos] = { finish: 0 };
        const endKey = 'finish';
        graphz[endKey] = { E: 0 };
        const results: DijkstraResult = this.dijkstra(graphz, startpos);
        return results;
    }

    // TODO Fix this to validate for the coordinate existence in the poi list
    coordinatesMatchIndoorParams(startCoordinates: string, endCoordinates: string) {
        return true;
    }

}

interface DijkstraResult {
    distance: number;
    path: string[];
}

/**
 * Helper function to compare if two string arrays are equal.
 */
function compare(array1: string[], array2: string[]) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

interface AdjacencyMatrix {
    [coordinateName: string]: Edge;
}

interface Edge {
    [coordinateName: string]: number;
}

interface IndoorCoordinates {
    [coordinateName: string]: StoredCoordinates;
}

interface StoredCoordinates {
    lat: string;
    lng: string;
    fN: number;
}
