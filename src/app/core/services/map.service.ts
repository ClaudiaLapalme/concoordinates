import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleApisService } from './google-apis.service';
import { LocationService } from './location.service';
import { Map, Building } from '../models';
import { OutdoorMap } from '../models/outdoor-map';
import { OutdoorPOIFactoryService } from '../factories';
import { PlaceService } from './place.service';

@Injectable()
export class MapService {

    private outdoorMap: Map;

    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService,
        private placeService: PlaceService
    ){ this.loadOutdoorMap(); }

    icon: google.maps.Icon = {
        url: '../../../assets/icon/location_marker.png',
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
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        try {
            const geoPos: Geoposition = await this.locationService.getGeoposition();
            if (geoPos) {

                const latLng = this.googleApis.createLatLng(geoPos.coords.latitude, geoPos.coords.longitude);

                mapOptions.center = latLng;

                const mapObj = this.googleApis.createMap(mapElement, mapOptions);
                this.googleApis.createMarker(latLng, mapObj, this.icon);
                this.placeService.enableService(mapObj);

                this.displayBuildingsOutline(mapObj);

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
            this.trackBuildingCodeDisplay(mapObj.getZoom());
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
                outdoorPOI.createBuildingOutline(mapRef, this.placeService);
            }
        }

    }

    /**
     * When the zoom value on the map is 20 or higher, the H building outline is hidden.
     * @param zoomValue 
     */
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

    /**
     * When the zoom value on the map is 18 or higher, the labels on the Concordia Buildings are displayed.
     * @param zoomValue 
     */
    private trackBuildingCodeDisplay(zoomValue: number): void {
        
        let outdoorPOIs = this.outdoorMap.getPOIs();

        for (let outdoorPOI of outdoorPOIs) {

            if (outdoorPOI instanceof Building) {
                if (zoomValue >= 18) {
                    outdoorPOI.displayBuildingLabel();
                }
                else {
                    outdoorPOI.removeBuildingLabel();
                }
            }

        }

    }
}