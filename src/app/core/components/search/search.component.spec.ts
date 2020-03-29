import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonInput } from '@ionic/angular';
import { SearchComponent } from './search.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PlaceService } from '../../services';


describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let placeServiceSpy;
    beforeEach(async(() => {
        placeServiceSpy = jasmine.createSpyObj('PlaceService', ['textSearch']);
        TestBed.configureTestingModule({
            declarations: [SearchComponent,],
            imports: [IonicModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
              { provide: PlaceService, useValue: placeServiceSpy },
            ]
        }).compileComponents();

      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('search()', () => {
        it('should restore search bar when input is empty', () => {
            component.search();
            expect(component.searchResultsArray).toEqual([]);
            expect(component.showSearchOverlay).toBeFalsy();
            expect(component.searching).toBeFalsy();
        });

        it('should trigger search for POIS', () => {
            let key = "value";
            component.searchInput[key] = "concordia";
            component.search();
            expect(component.showSearchOverlay).toBeTruthy();
        });

    });

    describe('searchOutdoorPOIs()', async () => {
        it('should search for the points of intersts ', () => {
            component.searchOutdoorPOIs("concordia");
            expect(component.searching).toBeTruthy;
        });
    });

    describe('handleSearchForOutdoorPOIs()', () => {
        it('should handle the searching for the points of intersts ', () => {
            let fnName = 'handleSearchForOutdoorPOIs';
            component[fnName]([]);
            component[fnName](["concordia"]);
            expect(component.searching).toBeFalsy();
        });
    });

    
    describe('handleSearchForIndoorPOIs()', () => {
        it('should handle the searching for the points of intersts ', () => {
            let fnName = 'handleSearchForIndoorPOIs';
            component[fnName]([]);
            component[fnName](["H832"]);
            expect(component.searching).toBeFalsy();
        });
    });

    describe('handleSearchForPOIsError()', () => {
        it('should handle errors for the searching points of intersts ', () => {
            let fnName = 'handleSearchForPOIsError';
            component[fnName]([]);
            expect(component.resultFound).toBeFalsy();
            expect(component.searching).toBeFalsy();
        });
    });

    describe('focusOutdoorPOI()', () => {
        it('should focus on the point of interests', () => {
            component.focusOutdoorPOI(PlaceService);
            expect(component.showSearchOverlay).toBeFalsy();
            expect(component.searching).toBeFalsy();
            expect(component.searchResultsArray).toEqual([]);

        });
    });

    describe('focusIndoorPOI()', () => {
        it('should focus on the point of interests', () => {
            component.focusIndoorPOI("H82");
            expect(component.showSearchOverlay).toBeFalsy();
            expect(component.searching).toBeFalsy();
            expect(component.searchResultsArray).toEqual([]);

        });
    });

    describe('cancelSearch()', () => {
        it('should cancel the search', () => {
            component.cancelSearch();
            expect(component.showSearchOverlay).toBeFalsy();
            expect(component.searching).toBeFalsy();
            expect(component.searchResultsArray).toEqual([]);
        });
    });


});
