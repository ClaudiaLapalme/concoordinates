import { OutdoorPOI } from "./outdoor-poi";
import { Building } from './building';
import { Coordinates } from "./coordinates";


export class Campus extends OutdoorPOI{

    private buildings: Building[];

    constructor(
        name: string,
        coordinates: Coordinates,
        buildings: Building[]) {
        
            super(name, coordinates);
            this.setBuildings(buildings);
    };

    getBuildings(): Building[]{
        return this.buildings;
    }

    private setBuildings(buildings: Building[]): void{
        this.buildings = buildings;
    }
}