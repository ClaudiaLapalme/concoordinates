import { IndoorPOI } from './indoor-poi';
import { Map } from './map';

export class IndoorMap extends Map{

    private indoorMapPicturePath: string;

    constructor(
        private indoorMapLevel: number,
        private indoorMapBuildingCode: string,
        private listOfPOIs: IndoorPOI[]
    ) {
        super(listOfPOIs);
        this.indoorMapPicturePath = "assets/floor_plans/" + indoorMapBuildingCode + "_" + indoorMapLevel + "_Beige.png";
    }

    getPicturePath(): string {
        return this.indoorMapPicturePath;
    }

    public createIndoorPOIsLabels(mapRef: google.maps.Map): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.createIndoorPOILabel(mapRef);
            indoorPOI.removeIndoorPOILabel();
        }
    }

    public displayIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.displayIndoorPOILabel();
        }
    }

    public removeIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.removeIndoorPOILabel();
        }
    }
}
