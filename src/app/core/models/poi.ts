import { Coordinates } from "./coordinates"

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

    getCoordinates(): Coordinates {
        return this.coordinates;
    }

    private setCoordinates(coordinates: Coordinates): void {
        this.coordinates = coordinates;
    }
}