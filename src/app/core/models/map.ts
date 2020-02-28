import { POI } from './poi';

export abstract class Map {

    private pois: POI[];

    constructor(pois: POI[]) {

        this.pois = pois;
    };

    getPOIs(): POI[] {
        return this.pois;
    };

    //displayPOI(): void{};

    //findCurrentLocation(): void{}

    //displayCurrentLocation(): void{}

    //displayRoute(): void{}

    //generateRoutes(startCoordinates: Coordinates, endCoordinates: Coordinates): Route[] {}

    //searchPOI(searchTerm:string): POI {}

}
