import * as adjacencyMatrix from '../data/adjacency-matrix.json' ;
import * as indoorPoiCoordinates from '../data/indoor-poi-to-coordinates.json' ;
import { Coordinates } from './coordinates';
import { Route } from './route';

export class IndoorRoute implements Route {
    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    // In case of indoor, the steps constitute of the nodes in the adjacency matrix constituting the complete route
    routeSteps: string[];

    computeTotalDuration(): number {
        throw new Error("Method not implemented.");
    }
    computeTotalDistance(): number {
        throw new Error("Method not implemented.");
    }

}
