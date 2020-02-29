import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleApisService } from './google-apis.service';
import { LocationService } from './location.service';
import { Map, Building } from '../models';
import { OutdoorMap } from '../models/outdoor-map';
import { OutdoorPOIFactoryService } from '../factories';

@Injectable()
export class MapService {

    private outdoorMap: Map;

    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService
    ){ this.loadOutdoorMap(); }

    icon: google.maps.Icon = {
        url: '../../../assets/icon/center_marker.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
    };

    SGW_COORDINATES: google.maps.LatLng = new google.maps.LatLng(45.4959053, -73.5801141);

    /**
     * Given a map reference create a map 
     * @param mapElement the reference to the html map
     */
    async loadMap(mapElement: ElementRef): Promise<google.maps.Map<Element>> {
        let mapOptions: google.maps.MapOptions = {
            center: this.SGW_COORDINATES,
            zoom: 15,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
            },
            disableDefaultUI: true,
            mapTypeControl: false,
            scaleControl: true,
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        try {
            const geoPos: Geoposition = await this.locationService.getGeoposition();
            if (geoPos) {

                const latLng = this.googleApis.createLatLng(geoPos.coords.latitude, geoPos.coords.longitude);

                mapOptions.center = latLng;

                const mapObj = this.googleApis.createMap(mapElement, mapOptions);
                this.googleApis.createMarker(latLng, mapObj, this.icon);

                this.displayBuildingsOutline(mapObj);
                this.displayBuildingsInformation(mapObj);

                mapObj.addListener('tilesloaded',
                    this.tilesLoadedHandler(mapObj,
                        latLng.lat(), latLng.lng()));

                return mapObj;

            } else {
                return this.googleApis.createMap(mapElement, mapOptions);
            }
        } catch (error) {
            console.log(error);
            return this.googleApis.createMap(mapElement, mapOptions);
        }
    }

    private tilesLoadedHandler(mapObj: google.maps.Map, latitude: number, longitude: number) {
        return () => {
            console.log('mapObj', mapObj); // debug
            this.locationService.getAddressFromLatLng(latitude, longitude).then(console.log);
            this.trackHallBuildingDisplay(mapObj.getZoom());
        };
    }

    private loadOutdoorMap(): void {

        let outdoorPOIFactory = new OutdoorPOIFactoryService();

        this.outdoorMap = new OutdoorMap(outdoorPOIFactory.loadOutdoorPOIs());
    }

    private displayBuildingsOutline(mapRef: google.maps.Map<Element>) {

        let outdoorPOIs = this.outdoorMap.getPOIs();

        for (let outdoorPOI of outdoorPOIs) {

            if (outdoorPOI instanceof Building) {
                outdoorPOI.createBuildingOutline(mapRef);
            }
        }

    }

    private displayBuildingsInformation(mapRef: google.maps.Map<Element>) {

        let outdoorPOIs = this.outdoorMap.getPOIs();

        for (let outdoorPOI of outdoorPOIs) {

            if (outdoorPOI instanceof Building) {
                outdoorPOI.displayBuildingInformation(mapRef);
            }
        }

    }

    private trackHallBuildingDisplay(zoomValue: number): void {

        let hallBuildingName = 'Henry F. Hall Building';
        let building = this.outdoorMap.getPOI(hallBuildingName);

        if (building instanceof Building) {
            if (zoomValue >= 20) {
                building.removeBuildingOutline();
            }
            else {
                building.displayBuildingOutline();
            }
        }
    }
}