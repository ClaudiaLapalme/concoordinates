import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../../services/map.service';
import { IndoorMapComponent } from './indoor-map.component';
import { IndoorMap } from '../../models/indoor-map'

describe('IndoorMapComponent', () => {
    let component: IndoorMapComponent;
    let fixture: ComponentFixture<IndoorMapComponent>;

    class MockMapService {
        getIndoorMaps(): void {}
    }
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndoorMapComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            providers: [{ provide: MapService, useClass: MockMapService }]
        }).compileComponents();

        fixture = TestBed.createComponent(IndoorMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    class MockMap extends google.maps.Map {}

    let map = new MockMap(null);
    let indoorMapDiv = new ElementRef(null); // html div reference

    class MockIndoorMap extends IndoorMap {
        public currentlySelected: boolean;
        constructor() {
            super( 8, 'H', [] );
            this.currentlySelected = false;
        }
        setup(map, indoorMapDiv, bounds) {}
        setupMapListeners(map) {}
        removeIndoorPOIsLabels() {}
        getPicturePath() {
            return 'path';
        }
        tryDisplayIndoorPOIsLabels() {}
    }
    describe('Testing ngAfterInit', () => {
        it('Test ngafterviewinit', () => {
            component.indoorMaps = { 8: new MockIndoorMap() };
            component.indoorMaps[8] = jasmine.createSpyObj('indoorMaps[8]', [
                'setup',
                'setupMapListeners'
            ]);
            component.map = map;
            component.indoorMapDiv = indoorMapDiv;
            component.ngAfterViewInit();
            expect(component.indoorMaps[8].setup).toHaveBeenCalled();
            expect(
                component.indoorMaps[8].setupMapListeners
            ).toHaveBeenCalled();
        });
        describe('Testing NgOnChanges', () => {
            it('Test ngOnChanges with this.indoorMapLevel false', () => {
                component.indoorMaps = { 8: new MockIndoorMap() };
                component.indoorMaps[8] = jasmine.createSpyObj(
                    'indoorMaps[8]',
                    [
                        'removeIndoorPOIsLabels',
                        'getPicturePath',
                        'tryDisplayIndoorPOIsLabels'
                    ]
                );
                component.indoorMapLevel = 8;
                component.ngOnChanges();

                expect(
                    component.indoorMaps[8].getPicturePath
                ).toHaveBeenCalled();

                expect(
                    component.indoorMaps[8].tryDisplayIndoorPOIsLabels
                ).toHaveBeenCalled();
            });
            it('Test ngOnChanges with this.indoorMapLevel false', () => {
                component.indoorMaps = { 8: new MockIndoorMap() };
                component.indoorMaps[8] = jasmine.createSpyObj(
                    'indoorMaps[8]',
                    [
                        'removeIndoorPOIsLabels',
                        'getPicturePath',
                        'tryDisplayIndoorPOIsLabels'
                    ]
                );
                component.previousIndoorMapLevel = 8;
                component.ngOnChanges();
                expect(
                    component.indoorMaps[8].removeIndoorPOIsLabels
                ).toHaveBeenCalled();
            });
        });
    });
});
