import { POI } from './poi';

export abstract class Map {

    private pois: POI[];

    constructor(pois: POI[]){

        this.pois = pois;
    };

    getPOIs(): POI[]{
        return this.pois;
    };

    getPOI(POIname: string){
        for ( let poi of this.pois){
            
            if( poi.getName() === POIname){
                return poi;
            }
        }
    }
}
