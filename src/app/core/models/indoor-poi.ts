import { Coordinates } from './coordinates';
import { POI } from './poi';

export class IndoorPOI extends POI {

    private floorNumber: number;

    constructor(name: string, coordinates: Coordinates, floorNumber: number) {
        super(name, coordinates);
        this.floorNumber = floorNumber;
    }

    getFloorNumber(): number {
        return this.floorNumber;
    }

    setFloorNumber(floorNumber: number) {
        this.floorNumber = floorNumber;
    }
}
