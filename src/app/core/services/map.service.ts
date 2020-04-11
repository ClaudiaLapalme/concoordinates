import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { AbstractPOIFactoryService } from '../factories';
import { Building, IndoorMap, IndoorRoute, Map, OutdoorMap, OutdoorRoute, Route, Coordinates } from '../models';
import { GoogleApisService } from './google-apis.service';
import { LocationService } from './location.service';
import { PlaceService } from './place.service';
import { ShuttleService } from './shuttle.service';
import { IconService } from './icon.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MapService {
    private outdoorMap: Map;
    private drawnPolyline: google.maps.Polyline = null;

    private showToggleFloorButton = new BehaviorSubject(false);
    public showToggleFloorButtonObservable = this.showToggleFloorButton.asObservable();

    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService,
        private placeService: PlaceService,
        private abstractPOIFactoryService: AbstractPOIFactoryService,
        private shuttleService: ShuttleService,
        private iconService: IconService
    ) {
        this.loadOutdoorMap();
    }

    SGW_COORDINATES: google.maps.LatLng = new google.maps.LatLng(
        45.4959053,
        -73.5801141
    );

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
                const latLng = this.googleApis.createLatLng(
                    geoPos.coords.latitude,
                    geoPos.coords.longitude
                );

                mapOptions.center = latLng;

                const mapObj = this.googleApis.createMap(
                    mapElement,
                    mapOptions
                );
                this.googleApis.createMarker(latLng, mapObj, this.iconService.getLocationIcon());
                this.placeService.enableService(mapObj);

                this.displayBuildingsOutline(mapObj);
                this.createIndoorPOIsLabels(mapObj);

                mapObj.addListener(
                    'tilesloaded',
                    this.tilesLoadedHandler(mapObj)
                );

                return mapObj;
            } else {
                return this.googleApis.createMap(mapElement, mapOptions);
            }
        } catch (error) {
            console.log(error);
            return this.googleApis.createMap(mapElement, mapOptions);
        }
    }

    private tilesLoadedHandler(mapObj: google.maps.Map): () => void {
        return () => {
            console.log('mapObj', mapObj); // debug
            this.trackBuildingsOutlinesDisplay(mapObj.getZoom());
            this.trackBuildingCodeDisplay(mapObj.getZoom());
            this.trackFloorToggleButton(mapObj);
        };
    }

    private loadOutdoorMap(): void {

        const outdoorPOIFactory = this.abstractPOIFactoryService.createOutdoorPOIFactory();
        outdoorPOIFactory.setMapService(this);

        this.outdoorMap = new OutdoorMap(outdoorPOIFactory.loadOutdoorPOIs());
    }

    /**
     * Right now, this function only loads the indoors maps for three floors
     * of the H building (1,8,9).
     */
    public loadIndoorMaps(): Record<number, IndoorMap> {
        const floors = [1, 8, 9];
        const indoorMapFactory = this.abstractPOIFactoryService.createIndoorPOIFactory();
        let indoorMaps: Record<number, IndoorMap> = {};

        for (let floor of floors) {
            const floorPOIs = indoorMapFactory.loadFloorPOIs(floor);
            const indoorMap = new IndoorMap(floor, 'H', floorPOIs);
            indoorMaps[floor] = indoorMap;
        }

        return indoorMaps;
    }

    private displayBuildingsOutline(mapRef: google.maps.Map<Element>): void {
        const outdoorPOIs = this.outdoorMap.getPOIs();

        for (const outdoorPOI of outdoorPOIs) {
            if (outdoorPOI instanceof Building) {
                outdoorPOI.createBuildingOutline(mapRef, this.placeService);
            }
        }
    }

    private createIndoorPOIsLabels(mapRef: google.maps.Map<Element>): void {
        const hBuilding = <Building>this.outdoorMap.getPOI('Henry F. Hall Building');
        const indoorMaps = hBuilding.getIndoorMaps();

        for (const floorNumber in indoorMaps) {
            indoorMaps[floorNumber].createIndoorPOIsLabels(mapRef);
        }
    }

    /**
     * When the zoom value on the map is 19 or higher, the outline of the focused building is removed.
     * Right now, only the H building is affected by this feature since it is the only building with
     * indoor map implemented.
     */
    private trackBuildingsOutlinesDisplay(zoomValue: number): void {
        const hallBuildingName = 'Henry F. Hall Building';
        const building = this.outdoorMap.getPOI(hallBuildingName);

        if (building instanceof Building) {
            if (zoomValue >= 19) {
                building.removeBuildingOutline();
                building.removeBuildingLabel();
            } else {
                building.displayBuildingOutline();
                building.displayBuildingLabel();
            }
        }
    }

    /**
     * When the zoom value on the map is 18 or higher, the labels on the Concordia Buildings are displayed.
     */
    private trackBuildingCodeDisplay(zoomValue: number): void {
        const outdoorPOIs = this.outdoorMap.getPOIs();

        for (let outdoorPOI of outdoorPOIs) {
            if (outdoorPOI instanceof Building) {
                if (zoomValue >= 18) {
                    outdoorPOI.displayBuildingLabel();
                } else {
                    outdoorPOI.removeBuildingLabel();
                }
            }
        }
    }

    /**
     * When the zoom value on the map is 19 or higher and the focused building is visible,
     * the toggle floor button is displayed. Right now, only the H building is affected
     * by this feature since it is the only building with indoor map implemented.
     */
    private trackFloorToggleButton(mapObj: google.maps.Map): void {
        const hallBuildingName = 'Henry F. Hall Building';
        const building = <Building> this.outdoorMap.getPOI(hallBuildingName);
        const zoomValue = mapObj.getZoom();
        const inBounds = mapObj.getBounds().contains(building.getMarkerPosition());

        if (zoomValue >= 19 && inBounds) {
            this.showToggleFloorButton.next(true);
        } else {
            this.showToggleFloorButton.next(false);
        }
        
    }

    async getUserLocation(): Promise<google.maps.LatLng> {
        const geoPos: Geoposition = await this.locationService.getGeoposition();

        if (geoPos) {
            return this.googleApis.createLatLng(
                geoPos.coords.latitude,
                geoPos.coords.longitude
            );
        }

        return this.SGW_COORDINATES;
    }

    displayRoute(map: google.maps.Map, route: Route, indoorMapLevel?: number) {
        if (route instanceof OutdoorRoute) {
            this.displayOutdoorRoute(map, route);
        } else if (route instanceof IndoorRoute) {
            this.displayIndoorRoute(map, route, indoorMapLevel);
        }
    }

    private displayOutdoorRoute(map: google.maps.Map, route: OutdoorRoute) {
        const renderer = this.getMapRenderer();
        renderer.setMap(map);

        if (this.shuttleService.isShuttleRoute(route)) {
            this.shuttleService.displayShuttleRoute(map, route)
        } else {
            this.googleApis
                .getDirectionsService()
                .route(route.getDirectionsRequestFromRoute(), (res: google.maps.DirectionsResult, status) => {
                    console.log(res);
                    if (status === 'OK') {
                        renderer.setDirections(res);
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
        }
    }

    private displayIndoorRoute(map: google.maps.Map, indoorRoute: IndoorRoute, indoorMapLevel: number) {
        const startCoords: Coordinates = indoorRoute.startCoordinates;
        const startLocation: google.maps.LatLng =
            new google.maps.LatLng(startCoords.getLatitude(), startCoords.getLongitude());

        // Clear polylines previously drawn in order to keep the needed polylines per floor only
        if (this.drawnPolyline != null) {
            this.drawnPolyline.setMap(null);
        }

        // If there are route steps for current floor, draw a directions polyline for that floor
        indoorRoute.routeSteps.forEach(routeStep => {
            if (routeStep.startCoordinate.getFloorNumber() === indoorMapLevel
                && routeStep.endCoordinate.getFloorNumber() === indoorMapLevel) {
                console.log('route step start floor number: ' + routeStep.startCoordinate.getFloorNumber());
                console.log('route step end floor number: ' + routeStep.endCoordinate.getFloorNumber());
                this.drawnPolyline = this.googleApis.createPolyline(mapCoordinatesArrayToLatLng(routeStep.path), true, 'red', 1.0, 2);
                this.drawnPolyline.setMap(map);
            }
        });

        map.setCenter(startLocation);
        map.setZoom(19);

        function mapCoordinatesArrayToLatLng(coordinates: Coordinates[]): google.maps.LatLng[] {
            const latLngArray: google.maps.LatLng[] = [];
            for (const coords of coordinates) {
                latLngArray.push(coordinatesToLatLng(coords));
            }
            return latLngArray;
        }

        function coordinatesToLatLng(coordinates: Coordinates): google.maps.LatLng {
            return new google.maps.LatLng(coordinates.getLatitude(), coordinates.getLongitude());
        }
    }

    getMapRenderer(): google.maps.DirectionsRenderer {
        return this.googleApis.getMapRenderer();
    }

    public getOutdoorMap(): OutdoorMap {
        return this.outdoorMap;
    }

    public createDestinationMarkers(map: google.maps.Map, route: Route): google.maps.Marker[] {

        const startLocation: google.maps.LatLng =
        new google.maps.LatLng(route.startCoordinates.getLatitude(), route.startCoordinates.getLongitude());

        const endLocation: google.maps.LatLng =
        new google.maps.LatLng(route.endCoordinates.getLatitude(), route.endCoordinates.getLongitude());

        const startMarker = this.googleApis.createMarker(startLocation, map, null);
        startMarker.setVisible(false);

        const endMarker = this.googleApis.createMarker(endLocation, map, null);
        endMarker.setVisible(false);

        const destinationMarkers = [startMarker, endMarker];

        const hallBuildingName = 'Henry F. Hall Building';
        const building = <Building> this.outdoorMap.getPOI(hallBuildingName);
        const indoorMaps = building.getIndoorMaps();

        if (route.startCoordinates.getFloorNumber() == route.endCoordinates.getFloorNumber()) {
            indoorMaps[route.startCoordinates.getFloorNumber()].setDestinationMarkers(destinationMarkers);
        }
        else {
            indoorMaps[route.startCoordinates.getFloorNumber()].setDestinationMarkers([startMarker]);
            indoorMaps[route.endCoordinates.getFloorNumber()].setDestinationMarkers([endMarker]);
        }

        return destinationMarkers;
    }

    public deleteDestinationMarkers(): void {
        const hallBuildingName = 'Henry F. Hall Building';
        const building = <Building> this.outdoorMap.getPOI(hallBuildingName);
        const indoorMaps = building.getIndoorMaps();

        for (let listIndex in indoorMaps) {
            indoorMaps[listIndex].deleteDestinationMarkers();
        }
    }
}
