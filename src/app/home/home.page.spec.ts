import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core';
import { MapService } from '../core/services/';
import { HomePage } from './home.page';
import { SearchComponent } from '../core/components';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        class MockMapService {
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
                RouterTestingModule.withRoutes([])
            ],
            providers: [{ provide: MapService, useClass: MockMapService }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('switchCampus()', () => {
        class MockMaps extends google.maps.Map {
            setCenter(): void {}
        }

        it('current center should default to SGW coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4959053, -73.5801141);
            expect(component.currentCenter).toEqual(mockLatLng);
        });

        it('current center should change from SGW to LOY coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4582, -73.6405);
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
        });

        it('current center change from LOY to SGW coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus();
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
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

        it('should create marker', () => {
            const search = fixture.debugElement.query(
                By.directive(SearchComponent)
            );
            const searchComponent = search.componentInstance;

            component.searchedPlaceMarker = null;
            searchComponent.placeSelection.emit();
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
});
