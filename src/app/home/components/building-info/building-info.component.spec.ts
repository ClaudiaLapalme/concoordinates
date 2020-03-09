import { BuildingInfoComponent } from './building-info.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule, PlaceService } from '../../../core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonPullUpFooterState } from 'ionic-pullup';
import { ConvertToDayOfWeek } from '../../pipes';

describe('BuildingInfoComponent', () => {

    let component: BuildingInfoComponent;
    let fixture: ComponentFixture<BuildingInfoComponent>;

    class MockMap extends google.maps.Map {}

    class MockPlaceService extends PlaceService {
        constructor(){
            super();
            this.enableService(new MockMap(null))
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BuildingInfoComponent,
                ConvertToDayOfWeek],
            imports: [
                IonicModule.forRoot(),
                RouterModule,
                CoreModule,
                RouterTestingModule.withRoutes([])],
            providers: [
                { provide: PlaceService, useClass: MockPlaceService }
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ]
        }).compileComponents();


        fixture = TestBed.createComponent(BuildingInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('set attributes functions: ', () => {

        it('setBuildingName()', () => {
            component["setBuildingName"]("test name");
            expect(component["buildingName"]).toBeDefined();
        });

        it('setBuildingPicturePath()', () => {
            component["setBuildingPicturePath"]("test picture");
            expect(component["setBuildingPicturePath"]).toBeDefined();
        });

        it('setBuildingAddress()', () => {
            component["setBuildingAddress"]("0000");
            expect(component["buildingAddress"]).toBeDefined();
        });

        it('setBuildingWebiste() with undefined', () => {
            component["setBuildingWebsite"](undefined);
            expect(component["buildingWebsite"]).toBeDefined();
        });

        it('setBuildingWebiste() with valid string', () => {
            component["setBuildingWebsite"]("website");
            expect(component["buildingWebsite"]).toBeDefined();
        });

        it('setBuildingPhoneNumber() with undefined', () => {
            component["setBuildingPhoneNumber"](undefined);
            expect(component["buildingPhoneNumber"]).toBeDefined();
        });

        it('setBuildingPhoneNumber() with valid string', () => {
            component["setBuildingPhoneNumber"]("514-444-4444");
            expect(component["buildingPhoneNumber"]).toBeDefined();
        });

        it('setBuildingSchedule() with undefined', () => {
            component["setBuildingSchedule"](undefined);
            expect(component["buildingSchedule"]).not.toBeDefined();
        });

        it('setBuildingPhoneNumber() with valid string', () => {
            component["setBuildingSchedule"]({periods:["some random schedule"]});
            expect(component["buildingSchedule"]).toBeDefined();
        });
    });

    describe('toggleSchedule()', () => {

        it('should change value of displaySchedule', () => {
            component.toggleSchedule();
            expect(component["displaySchedule"]).toBeTruthy();

            component.toggleSchedule();
            expect(component["displaySchedule"]).toBeFalsy();
        });
    });

    describe('toggleFooter()', () => {

        it('should change value of footerState', () => {
            component.toggleFooter();
            expect(component["footerState"] === IonPullUpFooterState.Expanded).toBeTruthy();

            component.toggleFooter();
            expect(component["footerState"] === IonPullUpFooterState.Collapsed).toBeTruthy();
        });
    });
});