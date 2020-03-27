import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../../services/map.service';
import { OverlayViewRenderer } from '../../services/overlay-view-renderer.service';
import { IndoorMapComponent } from './indoor-map.component';
import { OutdoorMap, IndoorMap, Building, POI } from '../../models';

describe('IndoorMapComponent', () => {
    let component: IndoorMapComponent;
    let fixture: ComponentFixture<IndoorMapComponent>;

    class MockIndoorMap extends IndoorMap {
        constructor() {
            super( 8, 'H', [] );
        }
        setup(map, indoorMapDiv, bounds) {}
        setupMapListeners(map) {}
        removeIndoorPOIsLabels() {}
        getPicturePath() {
            return 'path';
        }
        tryDisplayIndoorPOIsLabels() {}
    }
    class MockBuilding extends Building {
        constructor() {
            const mockIndoorMap = new MockIndoorMap;
            super('Henry F. Hall Building', 'H', null, { 8: mockIndoorMap} )
        }
    }
    class MockOutdoorMap extends OutdoorMap {
        constructor() {
            super( null );
        }
        getPOI(): MockBuilding {
            return new MockBuilding;
        }
    }
    class MockMapService {
        getOutdoorMap(): MockOutdoorMap {
            return new MockOutdoorMap;
        }
        getIndoorMaps(): MockIndoorMap {
            return new MockIndoorMap;
        }
    }
    class MockOverlayViewRenderer {
        setup(): void {}
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndoorMapComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: MapService, useClass: MockMapService },
                { provide: OverlayViewRenderer, useClass: MockOverlayViewRenderer }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IndoorMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    class MockMap extends google.maps.Map {
        private zoomValue: number;
        constructor(zoomValue: number) {
            super(null);
            this.zoomValue = zoomValue;
        }
        getZoom(): number {
            return this.zoomValue;
        }
    }

    describe('Testing NgOnChanges', () => {
        
        it('Test ngOnChanges with this.indoorMapLevel false', () => {
            component.indoorMaps[8] = jasmine.createSpyObj(
                'indoorMaps[8]',
                [
                    'removeIndoorPOIsLabels',
                    'displayIndoorPOIsLabels',
                    'getPicturePath'
                ]
            );
            component.ngOnChanges();

            expect(
                component.indoorMaps[8].removeIndoorPOIsLabels
            ).toHaveBeenCalledTimes(0);
            expect(
                component.indoorMaps[8].displayIndoorPOIsLabels
            ).toHaveBeenCalledTimes(0);
        });

        it('Test ngOnChanges with this.indoorMapLevel true', () => {       
            let map = new MockMap(10);
            component['map'] = map;
            component.indoorMaps = { 8: new MockIndoorMap() };
            component.indoorMaps[8] = jasmine.createSpyObj(
                'indoorMaps[8]',
                [
                    'removeIndoorPOIsLabels',
                    'displayIndoorPOIsLabels',
                    'getPicturePath'
                ]
            );
            component.indoorMapLevel = 8;
            component['currentlyDisplayedIndoorMap'] = component.indoorMaps[8];
            component.ngOnChanges();

            expect(
                component.indoorMaps[8].getPicturePath
            ).toHaveBeenCalled();
        });
    });

    describe('Testing tryDisplayIndoorPOIsLabels()', () => {

        it('displayIndoorPOIsLabels should be called', () => {
            let map = new MockMap(19);
            component['map'] = map;
            component.indoorMaps = { 8: new MockIndoorMap() };
            component.indoorMaps[8] = jasmine.createSpyObj(
                'indoorMaps[8]',
                [
                    'removeIndoorPOIsLabels',
                    'displayIndoorPOIsLabels',
                    'getPicturePath'
                ]
            );
            component.indoorMapLevel = 8;
            component['currentlyDisplayedIndoorMap'] = component.indoorMaps[8];
            component.ngOnChanges();

            expect(
                component.indoorMaps[8].displayIndoorPOIsLabels
            ).toHaveBeenCalled();
        });
    });
});
