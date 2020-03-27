import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Coordinates } from '..';
import { TransportMode } from '../models/transport-mode';
import { RoutesService } from '../services/routes.service';

@Injectable()
export class RouteFactory {
    constructor(private routesService: RoutesService) { }

    async generateDefaultRoutes(
        startCoordinates: Coordinates | string,
        endCoordinates: Coordinates | string,
        startTime?: Date,
        endTime?: Date,
        transportMode?: TransportMode
    ): Promise<any> {
        const convertedTransportMode: any = transportMode ? transportMode : 'TRAVEL';
        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.toString(),
            destination: endCoordinates.toString(),
            travelMode: convertedTransportMode,
            transitOptions: { departureTime: startTime, arrivalTime: endTime },
            provideRouteAlternatives: true
        };
        return await this.routesService.getMappedRoutes(dirRequest);
    }

    //TODO Placeholder for the location so that Dan can begin on the improvements, to be moved into logically appropriate class later
    generateIndoorRoute(){
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


        //This is the function that will be called to generate the final shortest indoor route
        function shortestPath(graphz, startpos, endpos) {
            // Since we don't need to traverse FROM the endpos,
            // the hack is to force convert the endpos link to the "finish" with distance 0,
            // effectively rendering the endpos to be the finish
            console.log('Searching for shortest route from ' + startpos + ' to ' + endpos)
            console.log(graphz);
            graphz[endpos] = { finish: 0 };
            graphz['finish'] = { E: 0 };
            console.log(graphz);
            const results = dijkstra(graphz, startpos);
            const expectedResults = { distance: 8, path: ['A', 'D', 'E', 'finish'] };

            console.log('dijkstra', results);
            if (results.path.toString() === expectedResults.path.toString()) {
                console.log('EQUAL');
            } else {
                console.log('DIFFERENT');
            }
        }
    }
}
