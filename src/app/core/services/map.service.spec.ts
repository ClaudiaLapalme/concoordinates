import { ElementRef } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { MapService } from './map.service';
import { OutdoorMap, Campus, Building, IndoorMap, Coordinates, IndoorRoute, POI, RouteStep, OutdoorRoute } from '../models';
import { OutdoorPOIFactoryService, IndoorPOIFactoryService } from '../factories';
import { IndoorPOI } from '../models/indoor-poi';
 
describe('MapService', () => {

    class MockOutdoorPOIFactoryService extends OutdoorPOIFactoryService {
        setMapService() {
            this['mapService'] = jasmine.createSpyObj('PlaceService', [
                'loadIndoorMaps'
            ]);
        }
    }

    class MockIndoorPOIFactoryService extends IndoorPOIFactoryService {
        loadFloorPOIs() {
            return null;
        }
    }

    class MockMarker {
        setVisible() {};
    }

    function testServiceSetup() {
        const locationServiceSpy = jasmine.createSpyObj('LocationService', [
            'getGeoposition',
            'getAddressFromLatLng'
        ]);
        const googleApisServiceSpy = jasmine.createSpyObj('GoogleApisService', [
            'createMap',
            'createMarker',
            'createLatLng',
            'mapReference',
            'getMapRenderer',
            'mapReference'
        ]);
        const placeServiceSpy = jasmine.createSpyObj('PlaceService', [
            'enableService'
        ]);
        const abstractPOIFactoryService = jasmine.createSpyObj('AbstractPOIFactoryService', [
            'createOutdoorPOIFactory',
            'createIndoorPOIFactory'
        ]);
        const shuttleService = jasmine.createSpyObj('ShuttleService', [
            'displayShuttleRoute'
        ]);
        const mockIconService  = jasmine.createSpyObj('mockIconService', [
            'getLocationIcon',
            'getStartIcon',
            'getEndIcon'
        ]);

        googleApisServiceSpy.createMarker.and.returnValue(new MockMarker);

        abstractPOIFactoryService.createOutdoorPOIFactory.and.returnValue(new MockOutdoorPOIFactoryService);
        abstractPOIFactoryService.createIndoorPOIFactory.and.returnValue(new MockIndoorPOIFactoryService);

        const mapService: MapService = new MapService(
            locationServiceSpy,
            googleApisServiceSpy,
            placeServiceSpy,
            abstractPOIFactoryService,
            shuttleService,
            mockIconService
        );
        return { mapService, locationServiceSpy, googleApisServiceSpy, abstractPOIFactoryService };
    }

    it('should be created', () => {
        const { mapService } = testServiceSetup();
        expect(mapService).toBeTruthy();
    });

    class MockMaps extends google.maps.Map {
        addListener() {
            return null;
        }
        setCenter() {}
        setZoom() {}
        getZoom(): number {
            return null;
        }
    }

    describe('loadMap()', () => {
        class MockElementRef extends ElementRef {
            nativeElement = {};
        }

        it('should return a map', () => {
            const {
                mapService,
                locationServiceSpy,
                googleApisServiceSpy
            } = testServiceSetup();

            const mapElement = new MockElementRef({});

            const mockGeoposition: Partial<Geoposition> = {
                coords: {
                    latitude: 12,
                    longitude: 34,
                    accuracy: 45,
                    altitude: 35,
                    altitudeAccuracy: 123,
                    heading: 421,
                    speed: 12
                }
            };
            locationServiceSpy.getGeoposition.and.returnValue(mockGeoposition);
            const mockMap = new MockMaps(null);

            const mockLatLng = new google.maps.LatLng(55, 66);
            const latKey = 'lat';
            const lngKey = 'lng';
            mockLatLng[latKey] = () => 55;
            mockLatLng[lngKey] = () => 566;

            googleApisServiceSpy.createMap.and.returnValue(mockMap);
            googleApisServiceSpy.createLatLng.and.returnValue(mockLatLng);
            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });

        it('should catch when an error occurs', () => {
            const {
                mapService,
                locationServiceSpy,
                googleApisServiceSpy
            } = testServiceSetup();

            const mapElement = new MockElementRef({});

            const mockGeoposition: Partial<Geoposition> = {
                coords: {
                    latitude: 12,
                    longitude: 34,
                    accuracy: 45,
                    altitude: 35,
                    altitudeAccuracy: 123,
                    heading: 421,
                    speed: 12
                }
            };

            const mockMap = new MockMaps(null);

            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });

        it('should call getGeoposition from locationService and get nothing', () => {
            const {
                mapService,
                locationServiceSpy,
                googleApisServiceSpy
            } = testServiceSetup();

            const mapElement = new MockElementRef({});
            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUserLocation()', () => {
        it("should return the user's location when available", () => {
            const {
                mapService,
                locationServiceSpy,
                googleApisServiceSpy
            } = testServiceSetup();
            const mockGeoposition: Partial<Geoposition> = {
                coords: {
                    latitude: 12,
                    longitude: 34,
                    accuracy: 45,
                    altitude: 35,
                    altitudeAccuracy: 123,
                    heading: 421,
                    speed: 12
                }
            };

            locationServiceSpy.getGeoposition.and.returnValue(mockGeoposition);
            mapService.getUserLocation();
            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });
    });

    describe('getOutdoorMap()', () => {
        it("should return outdoor map", () => {
            const { mapService } = testServiceSetup();
            const outdoorMap = mapService.getOutdoorMap();

            expect(outdoorMap).toBeTruthy();
        });
    });

    describe('trackBuildingsOutlinesDisplay', () => {
        const testBuildingName = 'Henry F. Hall Building';

        class MockIndoorMap extends IndoorMap{
            constructor() {
                super(null,null,null)
                this['listOfPOIs'] = [new IndoorPOI(null, new Coordinates(null,null,null), null)]
            }
        }

        class MockBuilding extends Building {
            removeOutlineCalled = false;

            constructor() {
                super(testBuildingName, null, null, {8: new MockIndoorMap});
            }

            removeBuildingOutline(): void {
                this.removeOutlineCalled = true;
            }
        }

        class MockCampus extends Campus {
            removeOutlineCalled = false;
            displayOutlineCalled = false;

            constructor() {
                super(testBuildingName, null, null, [new MockBuilding]);
            }

            removeBuildingOutline(): void {
                this.removeOutlineCalled = true;
            }

            displayBuildingOutline(): void {
                this.removeOutlineCalled = true;
            }
        }

        it('should remove hall building outline at zoom 20 or more', () => {
            const { mapService } = testServiceSetup();

            mapService['trackBuildingsOutlinesDisplay'](20);

            const hallBuilding = mapService['outdoorMap'].getPOI(
                testBuildingName
            );

            expect(hallBuilding['buildingOutline'].getVisible()).toBeFalsy;
        });

        it('should not try to display the outline of a no building object', () => {
            const { mapService } = testServiceSetup();

            let campusMock = new MockCampus();

            mapService['outdoorMap'] = new OutdoorMap([campusMock]);
            mapService['trackBuildingsOutlinesDisplay'](20);

            expect(campusMock.removeOutlineCalled).toBeFalsy();
            expect(campusMock.displayOutlineCalled).toBeFalsy();
        });
    });

    describe('trackBuildingCodeDisplay', () => {
        const testBuildingName = 'Henry F. Hall Building';

        class MockBuilding extends Building {
            removeCodeCalled = false;
            displayCodeCalled = false;

            constructor() {
                super(testBuildingName, null, null, null);
            }

            removeBuildingCode(): void {
                this.removeCodeCalled = true;
            }
            displayBuildingCode(): void {
                this.displayCodeCalled = true;
            }
        }

        class MockCampus extends Campus {
            removeCodeCalled = false;
            displayCodeCalled = false;

            constructor() {
                super(testBuildingName, null, null, null);
            }

            removeBuildingCode(): void {
                this.removeCodeCalled = true;
            }

            displayBuildingCode(): void {
                this.displayCodeCalled = true;
            }
        }

        it('should display building code at zoom 18 or more', () => {
            const { mapService } = testServiceSetup();

            mapService['trackBuildingCodeDisplay'](18);

            const hallBuilding = mapService['outdoorMap'].getPOI(
                testBuildingName
            );

            expect(hallBuilding['buildingLabel'].getVisible()).toBeTruthy;
        });

        it('should not try to display the code of a no building object', () => {
            const { mapService } = testServiceSetup();

            let campusMock = new MockCampus();

            mapService['outdoorMap'] = new OutdoorMap([campusMock]);
            mapService['trackBuildingCodeDisplay'](20);

            expect(campusMock.removeCodeCalled).toBeFalsy();
            expect(campusMock.displayCodeCalled).toBeFalsy();
        });
    });
    class MockElementRef extends ElementRef {
        nativeElement = {};
    }

    it('get renderer api', () => {
        const {
            mapService,
            locationServiceSpy,
            googleApisServiceSpy
        } = testServiceSetup();

        mapService.getMapRenderer();
        expect(googleApisServiceSpy.getMapRenderer).toHaveBeenCalled();
    });

    describe('loadIndoorMaps()', () => {
        it("should return indoor maps", () => {
            const { mapService } = testServiceSetup();
            const indoorMaps = mapService.loadIndoorMaps();

            for (const indoorMap in indoorMaps) {
                expect(indoorMap).toBeTruthy();
            }
        });
    });

    describe('trackFloorToggleButton()', () => {

        class MockMapObj {
            
            private boundsObj;

            constructor(boundsValue: boolean) {
                this.boundsObj = new MockBounds(boundsValue);
            }

            getZoom() {
                return 19;
            }

            getBounds(){
                return this.boundsObj;
            }
        }

        class MockBounds {

            private value;

            constructor(boundsValue: boolean) {
                this.value = boundsValue;
            }

            contains() {
                return this.value;
            }
        }

        it("should show toggle floor button", () => {
            const { mapService } = testServiceSetup();
            const mapObj = new MockMapObj(true);
            mapService['trackFloorToggleButton(mapObj)'];
            expect(mapService['showToggleFloorButton']).toBeTruthy;
        });

        it("should hide toggle floor button", () => {
            const { mapService } = testServiceSetup();
            const mapObj = new MockMapObj(false);
            mapService['trackFloorToggleButton(mapObj)'];
            expect(mapService['showToggleFloorButton']).toBeFalsy;
        });
    });

    describe('createDestinationMarkers() and deleteDestinationMarkers()', () => {

        class MockRouteSameFloor extends IndoorRoute {
            constructor()
            {
                super('H801', 'H803', false, [], 1);
            }
        }
        
        class MockRouteTwoFloors extends IndoorRoute {
            constructor()
            {
                super('H801', 'H903', false, [], 1);
            }
        } 

        class MockIndoorMap extends IndoorMap {

            private createCalled = false;
            private deleteCalled = false;

            constructor()
            {
                super(null, null, null);
            }

            setDestinationMarkers(){ this.createCalled = true };
            deleteDestinationMarkers(){ this.deleteCalled = true };
        } 
        
        class MockBuilding extends Building {
            constructor() {
                super('Henry F. Hall Building', 'H', null, {8: new MockIndoorMap, 9: new MockIndoorMap});
            }
        }   

        it("should create destination markers for the same floor", () => {
            const { mapService } = testServiceSetup();
            mapService['outdoorMap']['pois'] = [new MockBuilding()];
            const mapObj = new MockMaps(null);
            mapService.createDestinationMarkers(mapObj, new MockRouteSameFloor);

            const mockBuilding = <Building> mapService['outdoorMap']['pois'][0];
            expect(mockBuilding['indoorMaps'][8]['createCalled']).toBeTruthy;
        });

        it("should create destination markers for two floors", () => {
            const { mapService } = testServiceSetup();
            mapService['outdoorMap']['pois'] = [new MockBuilding()];
            const mapObj = new MockMaps(null);
            mapService.createDestinationMarkers(mapObj, new MockRouteTwoFloors);

            const mockBuilding = <Building> mapService['outdoorMap']['pois'][0];
            expect(mockBuilding['indoorMaps'][8]['createCalled']).toBeTruthy;
            expect(mockBuilding['indoorMaps'][9]['createCalled']).toBeTruthy;
        });

        it("should delete destination markers", () => {
            const { mapService } = testServiceSetup();
            mapService['outdoorMap']['pois'] = [new MockBuilding()];
            const mapObj = new MockMaps(null);
            mapService.createDestinationMarkers(mapObj, new MockRouteTwoFloors);

            mapService.deleteDestinationMarkers();

            const mockBuilding = <Building> mapService['outdoorMap']['pois'][0];
            expect(mockBuilding['indoorMaps'][8]['deleteCalled']).toBeTruthy;
            expect(mockBuilding['indoorMaps'][9]['deleteCalled']).toBeTruthy;
        });
    });

    describe('displayRoute()', () => {
        const { mapService } = testServiceSetup();
        const mockedRouteSteps: RouteStep[] = jasmine.createSpyObj('routeSteps', ['forEach']);
        class MockIndoorRoute extends IndoorRoute {
            constructor() {
                super('H962', 'H841', false, mockedRouteSteps, 10);
            }
        }

        class MockOutdoorRoute extends OutdoorRoute {
            constructor() {
                super(null, null, null, null, null, null);
            }
        }

        const testIndoorRoute: IndoorRoute = new MockIndoorRoute();
        const testOutdoorRoute: OutdoorRoute = new MockOutdoorRoute();
        const mockMap = new MockMaps(null);
        it('should call indoor route display', () => {
            const spiedIndoorRoute = spyOn(mapService, 'displayIndoorRoute');
            mapService.displayRoute(mockMap, testIndoorRoute);
            expect(spiedIndoorRoute).toHaveBeenCalled();
        });

        it('should call outdoor route display', () => {
            const spiedOutdoorRoute = spyOn(mapService, 'displayOutdoorRoute');
            mapService.displayRoute(mockMap, testOutdoorRoute);
            expect(spiedOutdoorRoute).toHaveBeenCalled();
        });

        it('should iterate over route steps for an indoor route', () => {
            mapService.displayRoute(mockMap, testIndoorRoute);
            expect(mockedRouteSteps.forEach).toHaveBeenCalled();
        });

    });
});
