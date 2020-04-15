import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule, TransportMode } from '../core';
import { RoutesPage } from './routes.page';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RoutesPage', () => {
    let component: RoutesPage;
    let fixture: ComponentFixture<RoutesPage>;

    const mockFactory = jasmine.createSpyObj('mockComponent', ['getRoutes']);
    const mockFormbuilder = jasmine.createSpyObj('mockFormbuilder', ['group']);

    let router: Router;
    


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutesPage],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, CoreModule, RouterTestingModule.withRoutes([])],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(RoutesPage);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
        router = TestBed.get(Router);
        component.router = router;


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should getRoutes with mode transit if no mode is specified', () => {
        component.setTransportMode(null);
        component.getRoutes();
        expect(component.transportMode).toEqual(TransportMode.TRANSIT);
    });

    it('should generateDefaultRoutes with departAt NOT filled', async () => {
        component.form.controls.departAt.setValue(null);
        component.form.controls.from.setValue('Concordia University');
        component.form.controls.to.setValue('Loyola Campus');
        fixture.detectChanges();
        const mockedComponent = new RoutesPage(mockFormbuilder, mockFactory, null, null, router, null, null);
        mockedComponent.form = component.form;
        const parsedDate = new Date();
        const actualTime = component.form.controls.time.value.split(':');
        parsedDate.setHours(actualTime[0]);
        parsedDate.setMinutes(actualTime[1]);

        await mockedComponent.getRoutes();
        expect(mockFactory.getRoutes).toHaveBeenCalled();

    });

    describe('search', () => {

        beforeEach(async(() => {
            spyOn(component, 'setFrom').and.callThrough();
            spyOn(component, 'setTo').and.callThrough();
        }));

        class MockPlaceResult implements google.maps.places.PlaceResult {
            address_components?: google.maps.GeocoderAddressComponent[];
            adr_address?: string;
            aspects?: google.maps.places.PlaceAspectRating[];
            formatted_address?: string;
            formatted_phone_number?: string;
            geometry?: google.maps.places.PlaceGeometry;
            html_attributions?: string[];
            icon?: string;
            id?: string;
            international_phone_number?: string;
            name: string;
            opening_hours?: google.maps.places.OpeningHours;
            permanently_closed?: boolean;
            photos?: google.maps.places.PlacePhoto[];
            place_id?: string;
            plus_code?: google.maps.places.PlacePlusCode;
            price_level?: number;
            rating?: number;
            reviews?: google.maps.places.PlaceReview[];
            types?: string[];
            url?: string;
            user_ratings_total?: number;
            utc_offset?: number;
            utc_offset_minutes?: number;
            vicinity?: string;
            website?: string;
        }


        // it('should call setFrom when place selection is emitted', () => {
        //     const search = fixture.debugElement.query(By.css('.search-from'));
        //     const searchComponent = search.componentInstance;
        //     const mockResult = new MockPlaceResult();
        //     searchComponent.placeSelection.emit(mockResult);
        //     expect(component.setFrom).toHaveBeenCalledWith(mockResult);
        // });
        // it('should call setTo when place selection is emitted', () => {
        //     const search = fixture.debugElement.query(By.css('.search-to'));
        //     const searchComponent = search.componentInstance;
        //     const mockResult = new MockPlaceResult();
        //     searchComponent.placeSelection.emit(mockResult);
        //     expect(component.setTo).toHaveBeenCalledWith(mockResult);
        // });


    });

});
