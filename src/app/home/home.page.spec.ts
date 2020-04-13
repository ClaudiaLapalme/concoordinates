import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core';
import { MapService, CalendarService } from '../core/services/';
import { OutdoorPOIFactoryService } from '../core/factories';
import { HomePage } from './home.page';
import { SearchComponent } from '../core/components';
import { By } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';



describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    class mockMap extends google.maps.Map{
        panTo() {}
        setZoom() {}
    }
    class MockOutdoorPOIFactoryService extends OutdoorPOIFactoryService {
        setMapService() {
            this['mapService'] = jasmine.createSpyObj('PlaceService', [
                'loadIndoorMaps'
            ]);
        }
    }

    const abstractPOIFactoryService = jasmine.createSpyObj('AbstractPOIFactoryService', [
        'createOutdoorPOIFactory',
        'createIndoorPOIFactory'
    ]);

    abstractPOIFactoryService.createOutdoorPOIFactory.and.returnValue(new MockOutdoorPOIFactoryService);

    beforeEach(async(() => {
        class MockMapService extends MapService {
            constructor(){
                super(null, null, null, abstractPOIFactoryService, null, null);
            }
            loadMap(): Promise<google.maps.Map<Element>> {
                return new Promise(() => {});
            }
        }

        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [
                IonicModule.forRoot(),
                RouterModule,
                CoreModule,
                RouterTestingModule.withRoutes([]),
                [AngularFireModule.initializeApp(environment.config)]
            ],
            providers: [
                { provide: MapService, useClass: MockMapService },
                AngularFireAuth,
                GooglePlus,
                CalendarService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        component.mapModel = new mockMap(null);
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('setCurrentCenter()', () => {
        const latLng = new google.maps.LatLng(54, 54);
       component.setCurrentCenter(latLng);
       expect(component.currentCenter).toEqual(latLng); 
    });

    describe('switchCampus()', () => {

        class MockMaps extends google.maps.Map {
            setCenter(): void {}
        }

        const SGW = new google.maps.LatLng(45.4959053, -73.5801141);
        const LOYOLA = new google.maps.LatLng(45.4582, -73.6405);

        it('should set the current center to SGW if it receives 1', () => {
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus(1);
            expect(component.currentCenter).toEqual(SGW);
        });

        it('should set the current center to LOY if it receives 2', () => {
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus(2);
            expect(component.currentCenter).toEqual(LOYOLA);
        });
    });

    describe('switchFloors()', () => {
        it('should set a new indoorMapLevel', () => {
            component.switchFloors(5);
            expect(component.indoorMapLevel).toEqual(5);
            component.switchFloors(10);
            expect(component.indoorMapLevel).toEqual(10);
        });
    });

    describe('showControls', () => {
        beforeEach(async(() => {
            spyOn(component, 'showControls').and.callThrough();
            spyOn(component, 'removeControls').and.callThrough();
        }));

        it('should show controls', () => {
            const search = fixture.debugElement.query(
                By.directive(SearchComponent)
            );
            const searchComponent = search.componentInstance;

            searchComponent.showControls.emit();
            component.controlsShown = false;
            expect(component.showControls).toHaveBeenCalled();

            searchComponent.showControls.emit();
            component.controlsShown = true;
            expect(component.showControls).toHaveBeenCalled();
        });

        it('should remove controls', () => {
            const search = fixture.debugElement.query(
                By.directive(SearchComponent)
            );
            const searchComponent = search.componentInstance;

            component.controlsShown = false;
            searchComponent.removeControls.emit();
            expect(component.removeControls).toHaveBeenCalled();

            component.controlsShown = true;
            searchComponent.removeControls.emit();
            expect(component.removeControls).toHaveBeenCalled();
        });
    });

    describe('remove marker', () => {
        beforeEach(async(() => {
            spyOn(component, 'removeMarker').and.callThrough();
        }));

        class Marker extends google.maps.Marker {
        }
        it('should remove marker', () => {
            const search = fixture.debugElement.query(
                By.directive(SearchComponent)
            );
            const searchComponent = search.componentInstance;

            component.searchedPlaceMarker = new Marker();
            searchComponent.cancelSelection.emit();
            expect(component.removeMarker).toHaveBeenCalled();

            component.searchedPlaceMarker = null;
            searchComponent.cancelSelection.emit();
            expect(component.removeMarker).toHaveBeenCalled();

        });
    });

    describe('create marker', () => {
        beforeEach(async(() => {
            spyOn(component, 'createMarker').and.callThrough();
        }));

        class mockPlaceResult{
            geometry = new mockGeometry;
        }

        class mockGeometry{
            location = new mockLocation;
        }

        class mockLocation{
            lat = 0;
            lng = 0;
        }

        /**
         * This test may occasionally fail.
         * Uknown side effect, occasionally there's an async timeout that occurs.
         * I would lean towards network instability causing the delays, hence the flakiness.
         */
        it('should create marker', () => {
            const placeResult: any = new mockPlaceResult;
            component.searchedPlaceMarker = null;

            component.createMarker(placeResult);

            expect(component.createMarker).toHaveBeenCalled();
            expect(component.searchedPlaceMarker).toBeDefined();

        });
    });

    describe('open menu', () => {
        beforeEach(async(() => {
            spyOn(component, 'openMenu').and.callThrough();
        }));

        it('should open menu', () => {
            const menuButton = fixture.debugElement.query(
                By.css('.hamburgerMenuButton')
            ).nativeElement;
            menuButton.click();
            expect(component.openMenu).toHaveBeenCalled();
        })
    })
    describe('handleRecenter(userLatLng)', () => {
        class MockMapsWithLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void { };
            getCenter(): google.maps.LatLng { return new google.maps.LatLng(4, -7); };
        }

        class MockMapsWithoutLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void { };
            getCenter(): google.maps.LatLng { return new google.maps.LatLng(45.4959053, -73.5801141); };
        }

        it('should set the center to the user\'s location', () => {
            const mockMap = new MockMapsWithLocation(null);
            const latLng = new google.maps.LatLng(4, -7);
            component.mapModel = mockMap;

            component.handleRecenter(latLng);
            expect(component.mapModel.getCenter()).toEqual(latLng);
        })

        it('should return the SGW coordinates when location is off', () => {
            const latLngSGW = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMapsWithoutLocation(null);
            component.mapModel = mockMap;

            component.handleRecenter(undefined);
            expect(component.mapModel.getCenter()).toEqual(latLngSGW);
        })
    })

});
