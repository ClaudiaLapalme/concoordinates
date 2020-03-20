import { Coordinates } from './coordinates';
import { POI } from './poi';

export class IndoorPOI extends POI {

    private poiLabel: google.maps.Marker;

    constructor(name: string, coordinates: Coordinates, iconPath: string) {
        super(name, coordinates);
        this.setBuildingLabel(iconPath);
    }

    getFloorNumber(): number {
        return this.getCoordinates().getFloorNumber();
    }

    private setBuildingLabel(iconPath: string): void {

        this.poiLabel = new google.maps.Marker({
            position: new google.maps.LatLng(this.getCoordinates().getLatitude(), this.getCoordinates().getLongitude()),
            draggable: false,
            icon: iconPath,
            label: this.getName()
        });
    }

    createIndoorPOILabel(mapRef: google.maps.Map<Element>): void {

        this.poiLabel.setMap(mapRef);
    }

    displayIndoorPOILabel() : void {

        this.poiLabel.setVisible(true);
    }
    
    removeIndoorPOILabel(): void {

        this.poiLabel.setVisible(false);
    }
}
