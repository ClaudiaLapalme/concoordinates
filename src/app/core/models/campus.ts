import { OutdoorPOI } from "./outdoor-poi";
import { Building } from './building';
import { Coordinates } from "./coordinates";

export class Campus extends OutdoorPOI {

    private code: string;
    private buildings: Building[];

    constructor(
        name: string,
        code: string,
        coordinates: Coordinates,
        buildings: Building[]) {

        super(name, coordinates);

        this.code = code;
        this.buildings = buildings;
    };

    getBuildings(): Building[] {
        return this.buildings;
    }
}