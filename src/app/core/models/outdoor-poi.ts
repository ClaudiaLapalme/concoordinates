import { POI } from './poi';
import { Coordinates } from "./coordinates"

export class OutdoorPOI extends POI {

    constructor(
        name: string,
        coordinates: Coordinates) {
            
            super(name, coordinates)
        }
    
}