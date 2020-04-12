import { IndoorPOI } from './indoor-poi';
import { Map } from './map';

export class IndoorMap extends Map{

    private indoorMapPicturePath: string;
    private destinationMarkers: google.maps.Marker[] = [];

    constructor(
        private indoorMapLevel: number,
        private indoorMapBuildingCode: string,
        private listOfPOIs: IndoorPOI[],
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

    public displayIndoorLabels(): void {
        this.displayIndoorPOIsLabels();
        this.displayDestinationMarkers();
    }

    public removeIndoorLabels(): void {
        this.removeIndoorPOIsLabels();
        this.removeDestinationMarkers();
    }

    private displayIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.displayIndoorPOILabel();
        }
    }

    private displayDestinationMarkers(): void {
        for (let destMarker of this.destinationMarkers) {
            destMarker.setVisible(true);
        }
    }

    private removeIndoorPOIsLabels(): void {
        for (let indoorPOI of this.listOfPOIs) {
            indoorPOI.removeIndoorPOILabel();
        }
    }

    private removeDestinationMarkers(): void {
        for (let destMarker of this.destinationMarkers) {
            destMarker.setVisible(false);
        }
    }

    public setDestinationMarkers(destinationMarkers: google.maps.Marker[]): void {
        this.destinationMarkers = destinationMarkers;
    }

    public deleteDestinationMarkers(): void {
        for (const destMarker of this.destinationMarkers) {
            destMarker.setMap(null);
        }
        this.destinationMarkers = [];
    }
}
