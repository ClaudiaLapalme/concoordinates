import { Coordinates } from "src/app/core/models/coordinates"

export abstract class POI {

    private name: string;
    private coordinates: Coordinates;

    constructor(
        name: string,
        coordinates: Coordinates) {
            
            this.name = name;
            this.setCoordinates(coordinates);
        }

    getName(): string {
        return this.name;
    }

    getCoordiantes() : Coordinates {
        return this.coordinates;
    }

    setCoordinates(coordinates: Coordinates): void {
        this.coordinates = coordinates;
    }
}