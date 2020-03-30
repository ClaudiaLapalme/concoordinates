import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { AbstractPOIFactoryService } from '../factories';
import { Building, IndoorMap, IndoorRoute, Map, OutdoorMap, OutdoorRoute, Route, Coordinates, RouteStep } from '../models';
import { GoogleApisService } from './google-apis.service';
import { LocationService } from './location.service';
import { PlaceService } from './place.service';
import { ShuttleService } from './shuttle.service';
import { IconService } from './icon.service';

@Injectable()
export class MapService {
    private outdoorMap: Map;

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
                    this.tilesLoadedHandler(mapObj, latLng.lat(), latLng.lng())
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

    private tilesLoadedHandler(
        mapObj: google.maps.Map,
        latitude: number,
        longitude: number
    ): () => void {
        return () => {
            console.log('mapObj', mapObj); // debug
            this.locationService
                .getAddressFromLatLng(latitude, longitude)
                .then(console.log);
            this.trackBuildingsOutlinesDisplay(mapObj.getZoom());
            this.trackBuildingCodeDisplay(mapObj.getZoom());
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
     * When the zoom value on the map is 20 or higher, the outline of the focused building is removed.
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

    displayRoute(map: google.maps.Map, route: Route) {
        if (route instanceof OutdoorRoute) {
            this.displayOutdoorRoute(map, route);
        } else if (route instanceof IndoorRoute) {
            this.displayIndoorRoute(map, route);
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

    private displayIndoorRoute(map: google.maps.Map, indoorRoute: IndoorRoute) {
        const renderer = this.getMapRenderer();


        renderer.setMap(map);
        const swBound = new google.maps.LatLng(
            45.49681658032052,
            -73.57955563558198
        );
        const eBound = new google.maps.LatLng(
            45.49771707945049,
            -73.57833170552253
        );

        const bounds = new google.maps.LatLngBounds(swBound, eBound);





        const startCoords: Coordinates = indoorRoute.startCoordinates;
        const endCoords: Coordinates = indoorRoute.endCoordinates;
        const startLocation: google.maps.LatLng =
            new google.maps.LatLng(startCoords.getLatitude(), startCoords.getLongitude());
        const endLocation: google.maps.LatLng =
            new google.maps.LatLng(endCoords.getLatitude(), endCoords.getLongitude());
        const request = {
            origin: {
                location: startLocation,
            },
            destination: {
                location: endLocation,
            },
            travelMode: indoorRoute.routeSteps[0].transport.travelType,
        };


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

        function mapRouteStepsToDirectionsStep(routeSteps: RouteStep[]): google.maps.DirectionsStep[] {
            const directionSteps: google.maps.DirectionsStep[] = [];
            for (const routeStep of routeSteps) {
                const latLngs: google.maps.LatLng[] = mapCoordinatesArrayToLatLng(routeStep.path);
                const encoded_lat_lngs: string = google.maps.geometry.encoding.encodePath(latLngs);
                const step = {
                    steps: [],
                    distance: {
                        text: routeStep.distance * 0.02 + ' km',
                        value: routeStep.distance * 3,
                    },
                    duration: {
                        text: 'XYZ mins',
                        value: 3,
                    },
                    start_location: coordinatesToLatLng(routeStep.startCoordinate),
                    end_location: coordinatesToLatLng(routeStep.endCoordinate),
                    start_point: coordinatesToLatLng(routeStep.startCoordinate),
                    end_point: coordinatesToLatLng(routeStep.endCoordinate),
                    instructions: '',
                    path: latLngs,
                    polyline: {
                        points: encoded_lat_lngs,
                    },
                    encoded_lat_lngs,
                    lat_lngs: latLngs,
                    transit: null,
                    travel_mode: null,
                };
                directionSteps.push(step);
            }
            return directionSteps;
        }
        

        const leg: google.maps.DirectionsLeg = {
            arrival_time: null,
            departure_time: null,
            distance: {
                text: indoorRoute.distance * 0.02 + ' km',
                value: indoorRoute.distance * 3,
            },
            duration: {
                text: 'XYZ mins',
                value: 3,
            },
            duration_in_traffic: null,
            end_address: '',  // useless
            end_location: endLocation,
            start_address: '', // useless
            start_location: startLocation,
            steps: mapRouteStepsToDirectionsStep(indoorRoute.routeSteps),
            via_waypoints: [],
        };

        const routes: google.maps.DirectionsRoute[] = [{
            bounds,
            copyrights: '', // useless
            fare: null, // useless
            legs: [leg],
            overview_path: [],
            overview_polyline: null,//'acutG`ya`MrBbBp@^\Jl@NJYJ]GEMQKX}^uZuRiR}XuRqPaUgY{Vp@k@YW|AgEvBhBFF',
            warnings: [],
            waypoint_order: []  // useless
        }];

        const directions: google.maps.DirectionsResult = {
            geocoded_waypoints: [],
            routes,
            request,
            status: 'OK',
        } as google.maps.DirectionsResult;

        renderer.setDirections(directions);
    }

    getMapRenderer(): google.maps.DirectionsRenderer {
        return this.googleApis.getMapRenderer();
    }

    public getOutdoorMap(): OutdoorMap {
        return this.outdoorMap;
    }
}
