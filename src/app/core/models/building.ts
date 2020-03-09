import { Coordinates } from './coordinates';
import { OutdoorPOI } from './outdoor-poi';
import { PlaceService } from '../services';

import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';

type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;
type BuildingInformation = google.maps.places.PlaceDetailsRequest;

export class Building extends OutdoorPOI {

    private buildingOutline: BuildingOutline;
    private buildingInformation: BuildingInformation;
    private buildingLabel: google.maps.Marker;
    private buildingPicturePath: string;

    constructor(
        name: string,
        code: string,
        coordinates: Coordinates) {

        super(name, coordinates);

        this.setBuildingOutline(code);
        this.setBuildingInformation(code);
        this.setBuildingLabel(code);
    }

    createBuildingOutline(mapRef: google.maps.Map<Element>, placeService: PlaceService): void {

        this.buildingOutline.setMap(mapRef);
        this.buildingLabel.setMap(mapRef);
        this.enableOutlineListener(placeService);
    }

    removeBuildingOutline(): void {

        this.buildingOutline.setVisible(false);
    }

    removeBuildingLabel(): void {

        if(this.buildingLabel != null) {

            this.buildingLabel.setVisible(false);
        }
    }

    displayBuildingOutline(): void {

        this.buildingOutline.setVisible(true);
    }

    displayBuildingLabel() : void {

        this.buildingLabel.setVisible(true);
    }

    /**
     * Adds an event listener on the building outline.
     * Whenever it is clicked, ask the PlaceService to display the building information.
     */
    private enableOutlineListener(placeService: PlaceService): void {

        this.buildingOutline.addListener('click', () =>{
            placeService.displayBuildingInformation(this.buildingInformation, this.getName(), this.buildingPicturePath);
        });
    }

    private setBuildingOutline(code: string): void {

        const outlineAttributes: OutlineAttributes = {
            paths: BuildingsOutlineCoordinates[code],
            strokeColor: '#000000',
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: '#000000',
            fillOpacity: 0.57
        };

        this.buildingOutline = new google.maps.Polygon(outlineAttributes);
    }

    private setBuildingLabel(code: string): void {

        const boundsCenter = this.centerOfPolygon(code);

        this.buildingLabel = new google.maps.Marker({
            label: {text: code, color: 'white'},
            icon:'../assets/icon/TransparentMarker.png',
            position: boundsCenter
        });
    }

    private setBuildingInformation(code: string): void {

        if(ConcordiaBuildings[code] != null) {

            this.buildingInformation = {
                placeId: ConcordiaBuildings[code].placeId,
                fields: ['formatted_address', 'formatted_phone_number', 'opening_hours', 'website']
            };

            this.buildingPicturePath =  ConcordiaBuildings[code].picture;
        }
    }

    private centerOfPolygon(code: string): google.maps.LatLng {

        if (ConcordiaBuildings[code] != null) {

            const coordinates = BuildingsOutlineCoordinates[code];
            const bounds = new google.maps.LatLngBounds();

            coordinates.forEach((coord: google.maps.LatLng) => bounds.extend(coord));

            return bounds.getCenter();
        }
    }
}
