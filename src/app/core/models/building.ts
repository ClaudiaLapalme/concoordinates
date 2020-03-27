import { Coordinates } from './coordinates';
import { OutdoorPOI } from './outdoor-poi';
import { IndoorMap } from './indoor-map';
import { PlaceService } from '../services';

import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;
type BuildingInformation = google.maps.places.PlaceDetailsRequest;

export class Building extends OutdoorPOI {

    private buildingOutline: BuildingOutline;
    private buildingInformation: BuildingInformation;
    private buildingLabel: google.maps.Marker;
    private buildingPicturePath: string;
    private buildingCode: string;
    private indoorMaps: Record<number, IndoorMap>;

    constructor(
        name: string,
        code: string,
        coordinates: Coordinates,
        indoorMaps: Record<number, IndoorMap>) {

        super(name, coordinates);
        
        this.buildingCode = code;
        this.indoorMaps = indoorMaps;
        this.setBuildingOutline();
        this.setBuildingInformation();
        this.setBuildingLabel();
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

        this.buildingLabel.setVisible(false);
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

    private setBuildingOutline(): void {

        const outlineAttributes: OutlineAttributes = {
            paths: BuildingsOutlineCoordinates[this.buildingCode],
            strokeColor: '#000000',
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: '#000000',
            fillOpacity: 0.57
        };

        this.buildingOutline = new google.maps.Polygon(outlineAttributes);
    }

    private setBuildingLabel(): void {

        const boundsCenter = this.getCenterOfPolygon();

        this.buildingLabel = new google.maps.Marker({
            label: {text: this.buildingCode, color: 'white'},
            icon:'../assets/icon/TransparentMarker.png',
            position: boundsCenter
        });
    }

    private setBuildingInformation(): void {

        if(ConcordiaBuildings[this.buildingCode] != null) {

            this.buildingInformation = {
                placeId: ConcordiaBuildings[this.buildingCode].placeId,
                fields: ['formatted_address', 'formatted_phone_number', 'opening_hours', 'website']
            };

            this.buildingPicturePath =  ConcordiaBuildings[this.buildingCode].picture;
        }
    }

    private getCenterOfPolygon(): google.maps.LatLng {

        if (ConcordiaBuildings[this.buildingCode] != null) {

            const coordinates = BuildingsOutlineCoordinates[this.buildingCode];
            const bounds = new google.maps.LatLngBounds();

            coordinates.forEach((coord: google.maps.LatLng) => bounds.extend(coord));

            return bounds.getCenter();
        }
    }

    public getIndoorMaps(): Record<number, IndoorMap> {
        return this.indoorMaps;
    }
}
