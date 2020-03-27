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

    getIndoorRoutes(
        startLocation: string,
        endLocation: string,
        disability: boolean = false
    ): IndoorRoute[] {
        if (startLocation === '' || endLocation === '') {
            throw new Error('start and end locations must not be empty');
        }

        const indoorRoutes: IndoorRoute[] = [];
        const dijkstraResults = this.getDijkstraResult(startLocation, endLocation, disability);

        dijkstraResults.forEach(dijkstraResult => {
            indoorRoutes.push(new IndoorRoute(startLocation, endLocation, disability, dijkstraResult.path, dijkstraResult.distance));
        });
        return indoorRoutes;
    }

    private getDijkstraResult(startLocation: string, endLocation: string, disability: boolean): any {
        const findLowestCostNode = (costs, processed) => {
            const knownNodes = Object.keys(costs);

            const lowestCostNode = knownNodes.reduce((lowest, node) => {
                if (lowest === null && !processed.includes(node)) {
                    lowest = node;
                }
                if (costs[node] < costs[lowest] && !processed.includes(node)) {
                    lowest = node;
                }
                return lowest;
            }, null);

            return lowestCostNode;
        };

        // function that returns the minimum cost and path to reach Finish
        const dijkstra = (graphzz, startElement) => {
            // console.log('Graph: ');
            // console.log(graphzz);

            // track lowest cost to reach each node
            const trackedCosts = Object.assign({ finish: Infinity }, graphzz[startElement]);
            // console.log('Initial `costs`: ');
            // console.log(trackedCosts);

            // track paths
            const trackedParents = { finish: null };

            for (const child in graphzz.start) {
                trackedParents[child] = 'start';
            }

            // console.log('Initial `parents`: ');
            // console.log(trackedParents);

            // track nodes that have already been processed
            const processedNodes = [];

            // Set initial node. Pick lowest cost node.
            let node = findLowestCostNode(trackedCosts, processedNodes);
            // console.log('Initial `node`: ', node)

            console.log('while loop starts: ')
            while (node) {
                // console.log(`***** 'currentNode': ${node} *****`);
                const costToReachNode = trackedCosts[node];
                const childrenOfNode = graphzz[node];

                for (const child in childrenOfNode) {
                    const costFromNodetoChild = childrenOfNode[child]
                    const costToChild = costToReachNode + costFromNodetoChild;

                    if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
                        trackedCosts[child] = costToChild;
                        trackedParents[child] = node;
                    }

                    // console.log('`trackedCosts`', trackedCosts);
                    // console.log('`trackedParents`', trackedParents);
                    // console.log('----------------');
                }

                processedNodes.push(node);

                node = findLowestCostNode(trackedCosts, processedNodes);
            }
            // console.log('while loop ends: ')

            const optimalPath = ['finish'];
            let parent = trackedParents.finish;
            while (parent) {
                optimalPath.push(parent);
                parent = trackedParents[parent];
            }
            optimalPath.reverse();

            const results = {
                distance: trackedCosts.finish,
                path: optimalPath
            };

            return results;
        };


        function shortestPath(graphz, startpos, endpos) {
            // Since we don't need to traverse FROM the endpos,
            // the hack is to force convert the endpos link to the "finish" with distance 0,
            // effectively rendering the endpos to be the finish
            console.log('Searching for shortest route from ' + startpos + ' to ' + endpos)
            console.log(graphz);
            graphz[endpos] = { finish: 0 };
            graphz['finish'] = { E: 0 };
            console.log(graphz);
            return dijkstra(graphz, startpos);
        }

        return shortestPath(adjacencyMatrix, startLocation, endLocation);
    }

    // TODO Fix this to validate for the coordinate existence in the poi list
    coordinatesMatchIndoorParams(startCoordinates: string, endCoordinates: string) {
        return false;
    }

}
