import { Injectable } from '@angular/core';
import * as adjacencyMatrix from '../data/adjacency-matrix.json';
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

        const moduleKey = 'default';    // TODO fix this
        const adjMatrix: AdjacencyMatrix = adjacencyMatrix[moduleKey];

        const normalShortestPath = this.shortestPath(adjMatrix, startLocation, endLocation);
        const disabilityShortestPath = this.shortestPath(this.getDisabilityAdjacencyMatrix(adjMatrix), startLocation, endLocation);

        console.log('shortestPath normal', normalShortestPath);
        console.log('shortestPath disability', disabilityShortestPath);

        const dijkstraResults: DijkstraResult[] = [];
        if (compare(normalShortestPath.path, disabilityShortestPath.path)) {
            dijkstraResults.push(disabilityShortestPath);
        } else {
            dijkstraResults.push(normalShortestPath, disabilityShortestPath);
        }

        dijkstraResults.forEach(dijkstraResult => {
            indoorRoutes.push(new IndoorRoute(startLocation, endLocation, disability, dijkstraResult.path, dijkstraResult.distance));
        });
        console.log(indoorRoutes);
        return indoorRoutes;
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
        const escalatorRegex: RegExp = /\w+\d+-E\d+[D | U]/;
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
