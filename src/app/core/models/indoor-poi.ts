import { Coordinates } from './coordinates';
import { POI } from './poi';

export class IndoorPOI extends POI {

    private poiLabel: google.maps.Marker;

    constructor(name: string, coordinates: Coordinates, iconPath: string) {
        super(name, coordinates);
        this.setPOILabel(iconPath);
    }

    getFloorNumber(): number {
        return this.getCoordinates().getFloorNumber();
    }

    private setPOILabel(iconPath: string): void {

        let labelName: string;

        if(iconPath !== '../../../assets/icon/TransparentMarker.png'){
            labelName = '';
        } else {
            labelName = this.getName();
        }

        this.poiLabel = new google.maps.Marker({
            position: new google.maps.LatLng(this.getCoordinates().getLatitude(), this.getCoordinates().getLongitude()),
            draggable: false,
            icon: iconPath,
            label: labelName
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
